import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { I18nService } from './i18n/i18n.service';
import { HeaderComponent } from './components/header/header.component';
import { LanguageSwitcherComponent } from "./components/language-switcher/language-switcher.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, LanguageSwitcherComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private i18n = inject(I18nService);

  ngOnInit() {
    this.loadTranslationFileFromService()
  }

  async loadTranslationFileFromService() {
    const lang = localStorage.getItem('lang') as 'en' | 'ar';
    const isTranslationFileLoaded = await this.i18n.loadTranlaionFile(lang || 'en');
    if (isTranslationFileLoaded)
      document.title = this.i18n.translate('app.title');
  }

}
