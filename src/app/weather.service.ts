import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'https://api.openweathermap.org/data/2.5';
  private apiKey = 'b181ee74612be93287fee89177e80a91'; // Replace with your actual API key

  constructor(private http: HttpClient) {}

  getCurrentWeather(city: string): Observable<any> {
    const encodedCity = encodeURIComponent(city);
    const url = `${this.apiUrl}/weather?q=${encodedCity}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }

  

  getWeeklyForecast(city:string): Observable<any> {
    const encodedCity = encodeURIComponent(city);
    const url = `${this.apiUrl}/forecast?q=${encodedCity}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }
}
