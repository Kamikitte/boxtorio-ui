import { DpointsService } from '../dpoints.service';
import { Component } from '@angular/core';
import { DeliveryPoint } from '../delivery-point';

@Component({
  selector: 'app-dpoints',
  templateUrl: './dpoints.component.html',
  
})
export class DpointsComponent {

  showDPList;
  showCreationForm;
  deliveryPoints?: DeliveryPoint[];

  address: string;
  constructor(private dpservice: DpointsService) {
    this.address = ''
    this.showDPList = true;
    this.showCreationForm = false;
    this.getDeliveryPoints();
  }

  createDeliveryPoint(): void {    
    this.dpservice.createDeliveryPoint(this.address)
      .subscribe();
  }

  //assignWorker(): void {
  //  this.dpservice.assignWorker('ef822298-7885-4818-a00a-2a1826c79376', '5a390d60-326a-409d-bdc0-e31354d79821')
  //    .subscribe();
  //}

  createFromForm()
  {
    this.createDeliveryPoint();
    this.openList();
  }

  openForm()
  {
    this.showDPList = false;
    this.showCreationForm = true;
  }

  openList()
  {
    this.getDeliveryPoints();
    this.showDPList = true;
    this.showCreationForm = false;
  }
  
  getDeliveryPoints(): void {
    this.dpservice.getDeliveryPoints()
      .subscribe((result) => {
        this.deliveryPoints = result
      });
  }
}
