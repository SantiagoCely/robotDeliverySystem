import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-create-new-menu-item-modal',
  templateUrl: './create-new-menu-item-modal.page.html',
  styleUrls: ['./create-new-menu-item-modal.page.scss'],
})
export class CreateNewMenuItemModalPage implements OnInit {
  @Input() modalTitle: string;
  @Input() modalId: number;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams

  ) { }

  ngOnInit() {
    alert("Create new menu item modal created");
    console.table(this.navParams);
    this.modalId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
    console.log(this.modalId, this.modalTitle);
  }

  async closeModal(){
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
  dismiss() {
  // using the injected ModalController this page
  // can "dismiss" itself and optionally pass back data
  this.modalController.dismiss({
    'dismissed': true
  });
}


}
