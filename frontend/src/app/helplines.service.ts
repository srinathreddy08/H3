import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelplineService {
  constructor() {}

  getHelplines(): Observable<any[]> {
    const helplines = [
      {
        name: 'MPower Minds',
        description: 'The Mpower Minds Helpline is a mental health service dedicated to providing free, confidential support to individuals experiencing psychological distress. Available 24/7, the helpline connects call...',
        helplineNumber: '1800-120-820050',
        time: '24 hours | 7 days a week',
        languages: 'English, हिंदी, मराठी',
        email: 'mpowerminds.info@abet.co.in',
        website: 'https://mpowerminds.com/oneonone'
      },
      {
        name: 'Fortis',
        description: 'The helpline is open to all. It runs 24x7 and ensures crisis intervention by expert psychologists from Fortis Healthcare.',
        helplineNumber: '+91-8376804102',
        time: '24 Hours | Monday to Sunday',
        languages: 'অসমীয়া, বাংলা , English, ગુજરાતી , हिंदी , ಕನ್ನಡ, कोंकणी, मराठी, മലയാളം, ਪੰਜਾਬੀ , தமிழ், తెలుగు, اُردُو , राजस्थानी and Achiku',
        email: 'mentalhealth@fortishealthcare.com',
        website: 'http://www.fortishealthcare.com'
      },
      {
        name: '1Life Suicide Prevention & Crisis Support',
        description: '1Life is a non-profit organization committed to suicide prevention through the support of experienced mental health professionals and trained tele-counselors. Recognizing the alarming rise in suicide...',
        helplineNumber: '7893078930',
        time: '5am to 12 am',
        languages: 'हिंदी, English, తెలుగు, தமிழ், ಕನ್ನಡ, മലയാളം, ગુજરાતી, मराठी, ਪੰਜਾਬੀ, سنڌي, भोजपुरी and বাংলা',
        email: 'onelifehelpline@hotmail.com / support@1life.org.in',
        website: 'https://1life.org.in/'
      },
      {
        name: 'Voice That Cares (VTC)',
        description: 'Voice That Cares (VTC) is a PAN India free public helpline that provides psychological first aid counselling support to individuals for mental health and well-being. It was launched by Ripples of C...',
        helplineNumber: '8448-8448-45',
        time: '9am-9pm | 7 days a week',
        languages: 'English, हिंदी and తెలుగు',
        email: 'info@rocf.org / vtc@rocf.org',
        website: 'https://www.rocf.org/voice-that-cares/'
      },
      {
        name: 'Connecting Trust Distress Helpline',
        description: 'The Distress Helpline Program by Connecting Trust offers immediate emotional support to individuals in distress, especially those experiencing suicidal thoughts. Operated by trained volunteers...',
        helplineNumber: '+91-9922001122, +91-9922004305',
        time: '12:00 PM - 08:00 PM | All days of the week',
        languages: 'English, हिंदी, मराठी',
        email: 'distressmailsconnecting@gmail.com',
        website: 'https://connectingngo.org/programs/distress-helpline-program/'
      },
      {
        name: 'Roshni Trust',
        description: 'Roshni trust is a voluntary organization that values human life. Roshni helpline comes under its umbrella. Roshni helpline provides free and confidential service by providing emotional support...',
        helplineNumber: '+91 8142020033/+91 8142020044',
        time: '11:00 AM - 9:00 PM | 7 days a week',
        languages: 'తెలుగు, हिंदी, English',
        email: 'roshnihelp@gmail.com',
        website: 'https://roshinitrust.com/'
      },
      {
        name: 'Lifeline',
        description: 'Lifeline offers a free tele-helpline providing emotional support to people who are in despair, depressed or suicidal. Face to face befriending with prior appointment is also available...',
        helplineNumber: '+91-9163940404, +91-9088030303',
        time: '10:00 AM - 10:00 PM | 7 days a week',
        languages: 'বাংলা, हिंदी, English',
        email: 'lifelinekolkata@gmail.com',
        website: 'http://lifelinekolkata.com/'
      },
      {
        name: 'Mann Talks',
        description: 'A Shantital Shanghvi Foundation initiative, Mann Talks focuses on empowering individuals to take charge of their mental health. A team of trained mental health professionals offers an empathetic approach...',
        helplineNumber: '+91-8686139139',
        time: '9:00 AM - 8:00 PM | 7 days a week',
        languages: 'हिंदी, English',
        email: 'counselling@manntalks.org',
        website: 'https://www.manntalks.org/'
      },
      {
        name: 'Arpita Foundation',
        description: 'Arpita Foundation, a Bangalore-based non-profit, offers professional counseling and guidance to individuals across India. Founded by Patrick and joined by Dr. Kalyani Keerthi Giridhara...',
        helplineNumber: '+91 80 23655557, +91 80 23656667',
        time: '7:00 AM - 09:00 PM | 7 days a week',
        languages: 'English, हिंदी, اردو, ಕನ್ನಡ, தமிழ், తెలుగు, മലയാളം, कोंकणी, অহমিয়া, ગુજરતી, বাংলা',
        email: 'arpita.helpline@gmail.com',
        website: 'https://www.arpitafoundation.org/'
      }
    ];

    return of(helplines); 
  }
}
