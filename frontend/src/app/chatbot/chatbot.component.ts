import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { flush } from '@angular/core/testing';
import { marked } from 'marked'; 
interface ChatMessage {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  messages: ChatMessage[] = [];
  newMessage: string = '';
  isOpen: boolean = false;
  isTyping: boolean = false;

  genAi = new GoogleGenerativeAI("AIzaSyAuo-ZNRnRtJbcBbErBVbUyfMmogNNaHVs"); //Add your API Key
  model = this.genAi.getGenerativeModel({ model: "gemini-1.5-flash" });

  async TestGemini(message: string) {
    const prompt = "Insights to reduce the carbon footprint by an individual";

    const result = await this.model.generateContent(message);
    console.log(result.response.text());
    return result.response.text();
  }

  async convertMarkdownToHtml(content: string): Promise<any> {
    let result=await marked(content)
    return result ? result : "";  // Convert markdown to HTML
  }

  private welcomeMessages = [
    "Hello! I'm here to support you. How are you feeling today?",
    "Remember, it's okay to not be okay. Would you like to talk about what's on your mind?",
    "I'm your safe space to share your thoughts. How can I help you today?"
  ];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const randomWelcome = this.welcomeMessages[Math.floor(Math.random() * this.welcomeMessages.length)];
    this.messages.push({
      content: randomWelcome,
      isUser: false,
      timestamp: new Date()
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  async sendMessage() {
    if (!this.newMessage.trim()) return;

    const userMessage = this.newMessage;

    this.messages.push({
      content: userMessage,
      isUser: true,
      timestamp: new Date()
    });
    this.isTyping = true;
    setTimeout(async () => {


      let aiResponse = await this.TestGemini(userMessage)

      this.messages.push({
        content: await this.convertMarkdownToHtml(aiResponse),
        isUser: false,
        timestamp: new Date()
      })

      this.newMessage = '';
      this.isTyping = false;
    }, 1500)

  }

  private containsCrisisKeywords(message: string): boolean {
    const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'want to die', 'harm myself'];
    return crisisKeywords.some(keyword => message.toLowerCase().includes(keyword));
  }
}