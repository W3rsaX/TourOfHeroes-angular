import { HeroService } from '../hero.service';
import { Hero } from '../hero.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, ViewChild, AfterViewInit, ElementRef} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.css',
})


export class HeroListComponent implements AfterViewInit {
  herolist !: Hero[];
  displayedColumns: string[] = ['id', 'name', 'race', 'gender', 'power', 'edit', 'delete'];
  dataSource: MatTableDataSource<Hero>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  constructor(private heroService: HeroService,
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer) {
    this.getHeroList()
  }


  ngAfterViewInit(): void {
    this.input.nativeElement.focus();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteHero(heroId: number): void {
    console.log(heroId)
    this.heroService.deleteHero(heroId).subscribe(
      {
        next: (res) => {
          console.log(res);
          this.getHeroList();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    )
  }

  updateHero(heroId: number): void {
    this.router.navigate(['/heroes', { heroId: heroId }]);
  }

  getHeroList(): void {
    this.heroService.getHeroes().subscribe(
      {
        next: (res: Hero[]) => {
          this.herolist = res;
          this.dataSource = new MatTableDataSource<Hero>(this.herolist);
          console.log(this.herolist)
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      }
    );
  }
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}