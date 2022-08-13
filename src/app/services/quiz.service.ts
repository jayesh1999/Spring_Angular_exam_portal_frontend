import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }

  //get quiz
  public Quizzes(){
   return  this.http.get(`${baseUrl}/quiz/`)
  }

  //add quiz
  public addQuizzes(quizData:any){
    return this.http.post(`${baseUrl}/quiz/`,quizData)
  }

  //delete quiz

  public deleteQuiz(qId:any){
    return this.http.delete(`${baseUrl}/quiz/${qId}`)
  }

  //load quiz by id
  public getQuiz(qid:number){
    return this.http.get(`${baseUrl}/quiz/${qid}`)
  }

  //update quiz
  public updateQuiz(quiz:any){
    return this.http.put(`${baseUrl}/quiz/`,quiz)

  }

  //get quizes of category
  public getQuizzesOfCategory(cid:any){
    return this.http.get(`${baseUrl}/quiz/category/${cid}`)
  }

  //get active quizess
  public getActiveQuizzes(){
    return this.http.get(`${baseUrl}/quiz/active`)
  }

  //get activequizessbycategory
  public getActiveQuizzesofCategory(cid:any){
    return this.http.get(`${baseUrl}/quiz/category/active/${cid}`)
  }
}
