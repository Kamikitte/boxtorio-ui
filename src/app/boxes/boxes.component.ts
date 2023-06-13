import { Component } from '@angular/core';
import { BoxesService } from '../boxes.service';
import { Box, BoxWithPlace } from '../box';
import { Place } from '../place';
import { ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  
})
export class BoxesComponent {

  showList;
  showCreationForm;
  showQrTable;
  showQrForm;
  boxes?: BoxWithPlace[];
  filteredBoxes?: Box[];
  showNewBoxAlert;

  searchCustomerId: string = '';
  output!: string;


  placeId!: string
  customerId!: string
  orderId!: string
  packageId!: string
  newPlace!: Place;

  displayedColumns: string[] = ['id', 'placeId', 'customerId'];

  constructor(private boxesService: BoxesService) {
    this.showList = true;
    this.showCreationForm = false;
    this.showQrTable = false;
    this.showQrForm = false;
    this.showNewBoxAlert = false;
  }
  
  ngOnInit() {
    this.getBoxes();
  }

   createFromForm(){
    this.addBox();
    this.showNewBoxAlert = true;
    this.openList();
  } 

  addBox(){    
    this.boxesService.getPlaceAutomated(parseInt(this.customerId))
    .pipe(
      tap(result => this.newPlace = result),
      switchMap(() => this.boxesService.addBox(this.newPlace.id, this.customerId, this.orderId, this.packageId))
    ).subscribe();
  }

  openForm(){
    this.showList = false;
    this.showCreationForm = true;
  }

  openList(){
    this.getBoxes();
    this.showList = true;
    this.showCreationForm = false;
  }
  
  getBoxes(): void {
    this.boxesService.getBoxesWithPlace()
      .subscribe((result) => {
        this.boxes = result
        this.filteredBoxes = result
      });
  }

  removeBox(id: string): void {
    this.boxesService.removeBox(id).subscribe();
    this.boxes = this.boxes!.filter(box => box.id !== id);
  }

  filterBoxes() {
    this.filteredBoxes = this.filteredBoxes!.filter(box =>
      box.customerId.toString().includes(this.searchCustomerId)
    );
  }
  
  public onEventTable(e: ScannerQRCodeResult[], action?: any): void {
    this.searchCustomerId = e[0].value;
    this.filterBoxes();
  }

  public onEventForm(e: ScannerQRCodeResult[], action?: any): void {    
    const data = e[0].value;
    const parsedData = JSON.parse(data);
    this.customerId = parsedData.customerId;
    this.orderId = parsedData.orderId;
    this.packageId = parsedData.packageId;
  }
}