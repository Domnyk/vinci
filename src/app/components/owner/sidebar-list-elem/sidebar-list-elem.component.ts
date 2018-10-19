import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { SportComplex } from '../../../models/sport-complex';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-sidebar-list-elem',
  templateUrl: './sidebar-list-elem.component.html',
  styleUrls: ['./sidebar-list-elem.component.css']
})
export class SidebarListElemComponent implements OnInit, AfterViewInit {
  @Input() sportComplex: SportComplex;

  chevron: IconDefinition = faChevronRight;

  private isCollapsed = true;

  constructor(private store: Store) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  changeIcon() {
    this.isCollapsed = !this.isCollapsed;

    if (this.isCollapsed) {
      this.chevron = faChevronRight;
      return;
    }

    this.chevron = faChevronDown;
  }
}
