import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-admin-dashboard-sidebar',
  templateUrl: './admin-dashboard-sidebar.component.html',
  styleUrls: ['./admin-dashboard-sidebar.component.css']
})
export class AdminDashboardSidebarComponent implements OnInit {
  @Select(state => state.sportComplexes) sportComplexes$: Observable<any>;

  chevron: IconDefinition = faChevronRight;

  constructor() { }

  ngOnInit() { }
}
