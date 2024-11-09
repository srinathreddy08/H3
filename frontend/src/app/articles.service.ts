import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private articles = [
    {
      title: 'Coping with Stress',
      category: 'stress',
      content: `Stress can be managed effectively through various techniques. 
      These include deep breathing exercises, mindfulness meditation, and physical activity. 
      It's important to recognize the signs of stress and take proactive steps to address it. 
      Engaging in regular physical activity can significantly reduce stress levels and improve overall well-being. 
      Always remember to reach out for help when needed.`
    },
    {
      title: 'Understanding Depression',
      category: 'depression',
      content: `Depression affects millions of people worldwide and can have a profound impact on daily life. 
      Symptoms include persistent sadness, loss of interest in activities, and changes in sleep and appetite. 
      It's crucial to seek help from a mental health professional if you or someone you know is struggling. 
      Therapy, medication, and support from loved ones can make a significant difference in recovery.`
    },
    {
      title: 'Managing Anxiety',
      category: 'anxiety',
      content: `Anxiety can be debilitating, but there are ways to cope. 
      Techniques such as cognitive-behavioral therapy (CBT), mindfulness, and relaxation exercises can help. 
      Additionally, maintaining a healthy lifestyle, including a balanced diet and regular exercise, 
      contributes to reducing anxiety symptoms. It's important to identify triggers and develop coping strategies.`
    },
    {
      title: 'The Effects of Chronic Stress',
      category: 'stress',
      content: `Chronic stress can lead to severe health issues, including heart disease, obesity, 
      and diabetes. Understanding the physical effects of stress on the body is vital. 
      Implementing stress management techniques in daily life is crucial for long-term health. 
      Making small lifestyle changes can lead to significant improvements in stress levels.`
    },
    {
      title: 'Finding Hope in Depression',
      category: 'depression',
      content: `Finding hope during depression can be challenging, but it is possible. 
      Engaging in supportive communities, pursuing hobbies, and practicing self-care are essential. 
      It’s vital to remember that recovery takes time and that reaching out for help is a sign of strength. 
      Sharing experiences with others can provide comfort and understanding.`
    },
    {
      title: 'Conquering Social Anxiety',
      category: 'anxiety',
      content: `Social anxiety is a common challenge for many individuals. 
      Understanding that it’s okay to feel anxious in social situations is the first step. 
      Gradual exposure to social interactions, combined with relaxation techniques, can help. 
      Remember, it’s about progress, not perfection. Celebrate small victories along the way!`
    },
    {
      title: 'Healthy Coping Mechanisms for Stress',
      category: 'stress',
      content: `Identifying healthy coping mechanisms is essential in managing stress. 
      Activities such as yoga, journaling, and spending time in nature can significantly enhance mental health. 
      It's beneficial to create a toolkit of strategies to turn to during stressful times. 
      Always prioritize self-care and recognize when professional help is needed.`
    },
    {
      title: 'The Importance of Sleep in Mental Health',
      category: 'depression',
      content: `Quality sleep plays a crucial role in mental health. 
      Lack of sleep can exacerbate symptoms of depression and anxiety. 
      Establishing a regular sleep routine, limiting screen time before bed, and creating a relaxing environment can improve sleep quality. 
      Prioritizing sleep is a vital component of overall well-being.`
    },
    {
      title: 'Mindfulness Techniques for Anxiety Management',
      category: 'anxiety',
      content: `Mindfulness can be a powerful tool in managing anxiety. 
      Practices such as meditation, focused breathing, and grounding techniques can bring relief. 
      Incorporating mindfulness into daily routines helps cultivate a sense of calm and clarity. 
      Consider starting with just a few minutes a day and gradually increasing your practice.`
    },
  ];

  constructor() {}

  getArticles(): Observable<any[]> {
    return of(this.articles); 
  }
}
