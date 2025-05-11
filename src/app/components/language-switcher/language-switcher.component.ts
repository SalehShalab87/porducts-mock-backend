import { Component } from '@angular/core';

@Component({
  selector: 'app-language-switcher',
  imports: [],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss'
})
export class LanguageSwitcherComponent {
  
   switchLanguage(){
    localStorage.setItem('lang', localStorage.getItem('lang') === 'en' ? 'ar' : 'en');
    window.location.reload();
  }
}
