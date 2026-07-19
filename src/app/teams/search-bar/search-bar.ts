import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

interface Search {
  searchValue: string;
}


@Component({
  selector: 'app-search-bar',
  imports: [FormField],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar {
  private searchBarValue = signal<Search>({ searchValue: '' });
  searchForm = form(this.searchBarValue);
}
