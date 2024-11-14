import { Component, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { OverpassPlace } from '../interfaces/overpass-place';
import { SafetyService } from '../safety.service';
//import { WeatherService } from '../weather.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { EmergencyContact } from '../interfaces/emergencycontact.interface';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-safety-service',
  standalone: true,
  imports: [FormsModule, CommonModule, NavbarComponent, HttpClientModule],
  templateUrl: './safety-service.component.html',
  styleUrl: './safety-service.component.css'
})

export class SafetyServiceComponent implements AfterViewInit {
  @ViewChild('map') mapContainer!: ElementRef;

  map: L.Map | null = null;
  userMarker: L.Marker | null = null;
  locationWatchId: number | null = null;
  searchQuery: string = '';
  weatherData: any = null;
  enableForm: boolean = false;
  dangerAreas: any = []

  location: string = "";
  incident: string = "";

  ngAfterViewInit(): void {
    this.initializeMap();
    this.startLocationTracking();
  }

  ngOnDestroy(): void {
    this.stopLocationTracking();
  }

  initializeMap(): void {
    // Initialize with a default view
    this.map = L.map(this.mapContainer.nativeElement).setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    // Get initial user location
    this.getCurrentLocation();

    this.getAllDangerAreas();
  }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(latitude)
          console.log(longitude)
          this.updateUserLocation(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enable location services.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser');
    }
  }

  startLocationTracking(): void {
    if (navigator.geolocation) {
      // Update location every 10 seconds
      this.locationWatchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.updateUserLocation(latitude, longitude);
        },
        (error) => {
          console.error('Error tracking location:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    }
  }

  stopLocationTracking(): void {
    if (this.locationWatchId !== null) {
      navigator.geolocation.clearWatch(this.locationWatchId);
    }
  }

  updateUserLocation(latitude: number, longitude: number): void {
    if (!this.map) return;

    // Create custom icon for user location
    const userIcon = L.divIcon({
      className: 'user-location-marker',
      html: '<img src="/assets/pin.png" width="24" height="24" />',
      iconSize: [20, 20]
    });

    // Remove existing user marker if it exists
    if (this.userMarker) {
      this.map.removeLayer(this.userMarker);
    }

    // Add new user marker
    this.userMarker = L.marker([latitude, longitude], {
      icon: userIcon,
      zIndexOffset: 1000 // Ensure user marker stays on top
    }).addTo(this.map);

    // Add accuracy circle
    const accuracyCircle = L.circle([latitude, longitude], {
      radius: 100, // You can adjust this or use position.coords.accuracy
      color: '#4A90E2',
      fillColor: '#4A90E2',
      fillOpacity: 0.1
    }).addTo(this.map);

    // Center map on user location
    this.map.setView([latitude, longitude], this.map.getZoom());
  }

  onSearchSubmit() {
    if (this.searchQuery) {
      this.searchLocation(this.searchQuery);
    }
  }

  searchLocation(query: string) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          if (this.map) {
            this.map.setView([lat, lon], 13);
            this.addNearbyPlaces(lat, lon);
            this.getWeather(lat, lon);
          }
        } else {
          console.log('No results found for the given query.');
        }
      })
      .catch(error => {
        console.error('Error fetching location data:', error);
      });
  }

  addNearbyPlaces(lat: number, lon: number) {
    const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];(node["amenity"="hospital"](around:10000,${lat},${lon});node["amenity"="police"](around:10000,${lat},${lon}););out;`;

    fetch(overpassUrl)
      .then(response => response.json())
      .then(data => {
        this.clearExistingMarkers();
        data.elements.forEach((place: OverpassPlace) => {
          if (place.lat && place.lon) {
            this.addMarker(place);
          }
        });
      })
      .catch(error => {
        console.error('Error fetching nearby places:', error);
      });
  }
  // Function to fetch weather using OpenWeather API
  getWeather(lat: number, lon: number) {
    const apiKey = '5d24c79e98b0a49f1d05645f57a36f9c';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(weatherUrl)
      .then(response => response.json())
      .then(data => {
        this.weatherData = data;  // Store weather data
        console.log('Weather data:', data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }

  clearExistingMarkers(): void {
    if (this.map) {
      this.map.eachLayer((layer: L.Layer) => {
        if (layer instanceof L.Marker) {
          this.map?.removeLayer(layer);
        }
      });
    }
  }

  addMarker(place: OverpassPlace): void {
    if (!this.map) return;

    const name = place.tags.name || 'Unnamed Place';
    const amenity = place.tags.amenity || 'unknown';
    let icon: L.Icon<L.IconOptions>;

    try {
      icon = this.getCustomIcon(amenity);
    } catch (error) {
      console.warn(`Failed to load custom icon for ${amenity}. Using default.`, error);
      icon = this.getDefaultIcon();
    }

    const marker = L.marker([place.lat, place.lon], { icon }).addTo(this.map);

    const popupContent = `
      <strong>${name}</strong><br>
      Type: ${amenity}<br>
      ${place.tags.phone ? `Phone: ${place.tags.phone}<br>` : ''}
      ${place.tags.opening_hours ? `Hours: ${place.tags.opening_hours}<br>` : ''}
    `;
    marker.bindPopup(popupContent);
  }

  getCustomIcon(amenity: string): L.Icon {
    const iconUrl = amenity === 'hospital'
      ? 'assets/hospital-icon.png'
      : 'assets/police-icon.png';
    return L.icon({
      iconUrl: iconUrl,
      iconSize: [16, 16],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
      shadowUrl: 'assets/marker-shadow.png',
      shadowSize: [10, 10]
    });
  }
  getDefaultIcon(): L.Icon<L.IconOptions> {
    return L.icon({
      iconUrl: '/assets/pin.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl: 'assets/marker-shadow.png',
      shadowSize: [41, 41]
    });
  }

  toggleForm(): void {
    this.enableForm = !this.enableForm
  }

  submitIncident(event: any): void {
    event.preventDefault();
    if (navigator.geolocation) {
      console.log("inside navigator")
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          let object = {
            latitude, longitude, location: this.location, description: this.incident, type: "Incident"
          }

          let url = "http://localhost:8090/api/safety/danger-areas"
          fetch(url, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(object)
          }).then(response => response.json())
            .then(data => alert("Reported Successfully"))
            .catch(error => console.log(error))
        },
        (error) => {
          console.log(error)
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

  }
  contacts: EmergencyContact[] = [];
  newContact: EmergencyContact = { userId: 0, name: '', phoneNumber: '', email: '' };
  apiUrl = 'http://localhost:8090/api/emergency-contacts';
  // constructor(private emergencyContactService: SafetyService) {}

  constructor(private http: HttpClient, private emergencyContactService: SafetyService, private router: Router) { }

  ngOnInit(): void {
    this.loadContacts();
  }

  getAllDangerAreas(): void {
    this.emergencyContactService.getAllDangerLocations().subscribe({
      next: (data) => {
        this.dangerAreas = data; // Store the danger areas from the API response

        // Clear any existing layers before adding new ones
        this.clearExistingDangerAreas();

        // Iterate through the danger areas and add a circle for each one
        data.forEach((dangerArea: any) => {
          if (dangerArea.latitude && dangerArea.longitude) {
            this.addDangerAreaCircle(dangerArea.latitude, dangerArea.longitude);
          }
        });
      },
      error: (error) => {
        console.log('Error fetching danger areas:', error);
      },
      complete: () => {
        console.log('Danger areas fetched successfully');
      }
    });
  }

  // Method to add a circle to the map for a danger area
  addDangerAreaCircle(latitude: number, longitude: number): void {
    if (this.map) {
      L.circle([latitude, longitude], {
        radius: 20, // Adjust radius as needed
        color: '#FF0000', // Red color for danger
        fillColor: '#FF0000',
        fillOpacity: 0.5
      }).addTo(this.map);
    }
  }

  // Optional: Clear existing danger area circles if needed
  clearExistingDangerAreas(): void {
    if (this.map) {
      this.map.eachLayer((layer: L.Layer) => {
        if (layer instanceof L.Circle) {
          this.map?.removeLayer(layer); // Remove any previous danger area circles
        }
      });
    }
  }

  // Load existing contacts
  loadContacts() {
    const user = localStorage.getItem("user")
    if (!user) {
      this.router.navigate(['/login'])
    }
    if (user) {
      let parsedUser = JSON.parse(user);
      console.log(parsedUser)
      this.http.get<EmergencyContact[]>(this.apiUrl).subscribe({
        next: (data) => {
          this.contacts = data
          this.contacts = data.filter(data => data.userId === parsedUser.id)
        },
        error: (error) => {
          console.log(error)
        }
      })
    }

  }

  // Add a new contact
  addContact() {
    const user = localStorage.getItem("user")
    if (!user) {
      this.router.navigate(['/login'])
    }
    if (user) {
      let parsedUser = JSON.parse(user);
      console.log(parsedUser)
      this.http.post<EmergencyContact>(this.apiUrl, {...this.newContact,userId:parsedUser.id})
        .subscribe({
          next: (data) => {
            this.contacts.push(data);
            this.newContact = { userId: parsedUser.id, name: '', phoneNumber: '', email: '' }; // Reset form
          }, error: (error) => {
            console.error('Error adding contact:', error);
          }
        });
    }
  }

  sendDangerAlert(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const emergencyMessage = {
            message: `EMERGENCY ALERT: User requires immediate assistance!\nLocation: https://www.google.com/maps?q=${latitude},${longitude}`,
            location: {
              latitude: latitude,
              longitude: longitude
            },
            timestamp: new Date().toISOString()
          };

          this.emergencyContactService.alertAllContacts(JSON.stringify(emergencyMessage))
            .subscribe({
              next: () => {
                alert('Emergency alert sent successfully to all contacts!');
              },
              error: (error) => {
                alert('Failed to send emergency alert. Please try alternative contact methods.');
                console.error('Error details:', error);
              }
            });
        },
        (error) => {
          const emergencyMessage = {
            message: "EMERGENCY ALERT: User requires immediate assistance! (Location unavailable)",
            timestamp: new Date().toISOString()
          };

          this.emergencyContactService.alertAllContacts(JSON.stringify(emergencyMessage))
            .subscribe({
              next: () => {
                alert('Emergency alert sent successfully!');
              },
              error: (error) => {
                alert('Failed to send alert. Please try alternative contact methods.');
                console.error('Error details:', error);
              }
            });
        }
      );
    } else {
      const emergencyMessage = {
        message: "EMERGENCY ALERT: User requires immediate assistance! (Location unavailable)",
        timestamp: new Date().toISOString()
      };

      this.emergencyContactService.alertAllContacts(JSON.stringify(emergencyMessage))
        .subscribe({
          next: () => {
            alert('Emergency alert sent successfully!');
          },
          error: (error) => {
            alert('Failed to send alert. Please try alternative contact methods.');
            console.error('Error details:', error);
          }
        });
    }
  }

  ;

  showContacts: boolean = false;
  showAddContact: boolean = false;
  enabaleForm: boolean = false;
  toggleContacts() {
    this.showContacts = !this.showContacts;
    // Close other panels when opening contacts
    if (this.showContacts) {
      this.enabaleForm = false;
    }
  }

  toggleAddContact() {
    this.showAddContact = !this.showAddContact;
  }

  toggleIncidentForm() {
    this.enabaleForm = !this.enabaleForm;
    // Close other panels when opening incident form
    if (this.enabaleForm) {
      this.showContacts = false;
    }
  }
}