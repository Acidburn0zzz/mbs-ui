import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';

import { BaseListComponent } from 'mbs/base-components/base-list.component';
import { ModuleService } from 'mbs/services/module.service';
import { MbsComponent } from 'mbs/types/mbs.type';


@Component({
  selector: 'app-module-components',
  templateUrl: './module-components.component.html',
  styleUrls: ['./module-components.component.scss']
})
export class ModuleComponentsComponent extends BaseListComponent implements OnInit {

  readonly koji_url: string = 'https://koji.fedoraproject.org/koji/';
  components: Array<MbsComponent> = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              public ngProgress: NgProgress,
              private moduleService: ModuleService) {super();}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.processRouteParams(params);
      this.components = [];
      this.exhausted = false;
      this.currentPage = 1;
      this.getComponents();
    })
  }

  getComponents(): void {
    if (!this.exhausted && !this.loading) {
      this.loading = true;
      this.moduleService.getComponents(this.currentPage, this.orderBy, this.orderDirection).subscribe(
        data => {
          if (data.items.length) {
            this.components = this.components.concat(data.items);
            this.currentPage += 1;
          } else {
            this.exhausted = true;
          }
        },
        error => {
          console.log(error);
        },
        () => {
          this.loading = false;
        }
      );
    }
  }

  onScrollDown () {
    this.getComponents();
  }

}
