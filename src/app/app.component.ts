import {Component, HostListener} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  priceForm = this.fb.group({
    name: ['', Validators.required],
    phone: ['', Validators.required],
    car: ['', Validators.required],
  })
  carsData: any;

  /*
  carsData = [

    {
      image: "1.png",
      name: "Lamborghini Huracan Spyder",
      transmission: "автомат",
      engine: 5.2,
      years: 2019,
    },
    {
      image: "2.png",
      name: "Chevrolet Corvette",
      transmission: "автомат",
      engine: 6.2,
      years: 2017,
    },
    {
      image: "3.png",
      name: "Ferrari California",
      transmission: "автомат",
      engine: 3.9,
      years: 2010,
    },
    {
      image: "4.png",
      name: "Lamborghini Urus",
      transmission: "автомат",
      engine: 4.0,
      years: 2019,
    },
    {
      image: "5.png",
      name: "Audi R8",
      transmission: "автомат",
      engine: 5.2,
      years: 2018,
    },
    {
      image: "6.png",
      name: "Chevrolet Camaro",
      transmission: "автомат",
      engine: 2.0,
      years: 2019,
    },
    {
      image: "7.png",
      name: "Maserati Quattroporte",
      transmission: "автомат",
      engine: 3.0,
      years: 2018,
    },
    {
      image: "8.png",
      name: "Dodge Challenger",
      transmission: "автомат",
      engine: 6.4,
      years: 2019,
    },
    {
      image: "9.png",
      name: "Nissan GT-R",
      transmission: "автомат",
      engine: 3.8,
      years: 2019,
    },
  ]
*/
  constructor(private fb: FormBuilder, private appService: AppService) {
  }

  ngOnInit(){
    this.appService.getData(this.category).subscribe(carsData => this.carsData = carsData )
  }

  category: string = 'sport';
  toggleCategory(category: string) {
    this.category = category;
    this.ngOnInit();
  }
  goScroll(target: HTMLElement, car?: any) {
    target.scrollIntoView({behavior: "smooth"})
    if (car) {
      this.priceForm.patchValue({car: car.name});
    }
  }

  trans: any;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.trans = {transform: 'translate3d(' + ((e.clientX * 0.3) / 8) + 'px,' + ((e.clientY * 0.3) / 8) + 'px,0px)'};
  }

  bgPos: any;

  @HostListener('document:scroll', ['$event'])
  onScroll() {
    this.bgPos = {backgroundPositionX: '0' + (0.3 * window.scrollY) + 'px'};
  }

  onSubmit() {
    if (this.priceForm.valid) {

      this.appService.sendQuery(this.priceForm.value)
        .subscribe({
          next: (response: any) => {
            alert(response.message)
            this.priceForm.reset()
          },
          error: (response) => {
            alert(response.error.message)
          }
        })

    }
  }
}
