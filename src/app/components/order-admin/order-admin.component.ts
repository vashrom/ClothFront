import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {
  Order,
  OrderDetails,
  OrderDetailsModelServer,
  OrderDetailsServerResponse, OrderModelServer,
  OrderServerResponse
} from "../../models/order.model";
import {OrderService} from "../../services/order.service";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.css']
})
export class OrderAdminComponent implements OnInit {

  @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>;

  editedOrderDetails: OrderDetails;
  ordersDetails: OrderDetailsModelServer[] = [];

  orders: OrderModelServer[]=[];
  editedOrder: Order;
  isNewRecord: boolean;
  statusMessage: string;

  orderDetails: OrderDetailsModelServer[] = [];

  constructor(private orderService: OrderService,private flashMessage: FlashMessagesService) {
    this.orders = new Array<Order>();
    this.ordersDetails = new Array<OrderDetails>();

  }

  ngOnInit(): void {
    this.loadOrders();
    this.loadOrdersDetails();


  }

  private loadOrdersDetails() {
    this.orderService.getAllOrderDetails().subscribe((orders: OrderDetailsServerResponse) => {
      this.ordersDetails = orders.orders.reverse();
    });
  }
  private loadOrders() {
    this.orderService.getAllOrders().subscribe((orders: OrderServerResponse) => {
      this.orders = orders.orders.reverse();
    });
  }

  private loadOrderDetailsById(id: number) {
      this.orderService.getSingleOrderDetails(id).subscribe((orders: OrderDetailsServerResponse) => {
        this.orderDetails = orders.orders.reverse();
      });
  }



  editOrder(ord: Order) {
    this.editedOrder = new Order(ord.id,ord.user_id,ord.fname,ord.lname,ord.country,ord.street,ord.postcode,ord.city,ord.email,ord.phone, ord.message );

    this.loadOrderDetailsById(ord.id);

    console.log(this.orderDetails);
  }

  loadTemplate(ord: Order){
    if(this.editedOrder && this.editedOrder.id === ord.id){
      return this.editTemplate;
    }
    else {
      return this.readOnlyTemplate;
    }
  }

  cancel() {
    if(this.isNewRecord){
      this.orders.pop();
      this.isNewRecord = false;
    }
    this.editedOrder = null;
  }

   deleteOrder(id: number) {
     this.orderService.deleteOrderDetails(id).subscribe((order: OrderDetailsServerResponse) => {

     });
    this.orderService.deleteOrderReq(id).subscribe((order: OrderDetailsServerResponse) => {
      this.statusMessage = "Замовлення успішно видалено", this.loadOrders();
      this.flashMessage.show(this.statusMessage, { cssClass: 'alert-success', timeout: 2000 });

    });
 }

}
