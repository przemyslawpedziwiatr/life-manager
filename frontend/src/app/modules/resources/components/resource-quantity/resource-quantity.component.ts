import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Quantity, Resource, ResourcesQuery, ResourcesService, ResourcesStore, ResourceUI } from '../../state';
import { EntityActions } from '@datorama/akita';

@Component({
  selector: 'app-resource-quantity',
  templateUrl: './resource-quantity.component.html',
  styleUrls: ['./resource-quantity.component.scss']
})
export class ResourceQuantityComponent implements OnInit {
  @Input() id;
  resource: Resource;
  public isSaving: boolean = false;

  constructor(private query: ResourcesQuery,
              private resourceService: ResourcesService) {
  }

  ngOnInit() {
    this.resource = this.query.getEntity(this.id);
    this.subscribeToUiChanges();
  }

  subscribeToUiChanges() {
    this.query.ui.selectEntity(this.id).subscribe(
      uiQuantity => {
        this.isSaving = uiQuantity.isSaving;
      }
    )
  }

  enlarge() {
    this.query.turnOnQuantitySaving(this.id);

    this.resourceService.enlargeQuantity(this.id, {
      onComplete: () => {
        this.query.turnOffQuantitySaving(this.id);
      }
    });
  }

  decrease() {
    this.query.turnOnQuantitySaving(this.id);

    this.resourceService.decreaseQuantity(this.id, {
      onComplete: () => {
        this.query.turnOffQuantitySaving(this.id);
      }
    });
  }

  progressBarQuantity() {
    return (this.resource.quantity +1) * 33 + 1;
  }

  progressColor() {
    const colorMap = [
      'warn',
      'accent',
      'primary'
    ];
    return colorMap[this.resource.quantity];
  }

}
