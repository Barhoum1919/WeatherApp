
import { WeatherService } from '../weather.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
  selector: 'app-weather-card',
  standalone: true,
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.css',
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [WeatherService]
})
export class WeatherCardComponent {

  city: string = '';
  temperature: number = 0;
  rainIntensity: number = 0;
  weatherData: any;
  weather: string = '';
  week:string='';
  hourlyForecast: any[] = [];
  weeklyForecast: any[] = [];
  forecastData: any;

  constructor(private weatherService: WeatherService){}
  getWeather() {
    this.weatherService.getCurrentWeather(this.city).subscribe((weather: any) => {
      this.weatherData = weather;
      console.log('Current Weather:', weather);
      this.temperature = this.weatherData?.main.temp;
      this.rainIntensity = this.weatherData?.rain?.['1h'] || 0;
      this.weather = this.weatherData?.weather[0].main;

   
    });
    this.weatherService.getWeeklyForecast(this.city).subscribe((week:any) => {
      this.forecastData = week;
      console.log(week);
  });

}
getSlides() {
  if (!this.forecastData) return [];
  const slides = [];

    for (let i = 0; i < this.forecastData.list.length; i += 6) {
      slides.push(this.forecastData.list.slice(i, i + 6));
    }
  
  return slides;
}

getWeatherIconClass(weather: string): string {
  switch (weather) {
    case 'Clear':
      return 'fa-sun';
    case 'Clouds':
      return 'fa-cloud';
    case 'Rain':
    case 'Drizzle':
    case 'Thunderstorm':
      return 'fa-cloud-showers-heavy';
    default:
      return 'fa-question'; // Add a default icon in case of unknown weather conditions
  }
}
}
