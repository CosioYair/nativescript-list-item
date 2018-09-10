import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "ns-listItem",
    moduleId: module.id,
    templateUrl: "./listItem.component.html",
    styleUrls: ["./listItem.css"],
})

export class ListItemComponent implements OnInit {
    @Input() properties: any;
    @Input() itemsList: any = [];

    @Output() listEvent: EventEmitter<any> = new EventEmitter<any>();

    private _connectivityModule: any = require("tns-core-modules/connectivity");
    public selectingState: string = "collapse";
    public normalState: string = "visible";
    public items: any;

    constructor(private _router: Router) {
    }

    ngOnInit() {
        this.items = JSON.parse(JSON.stringify(this.itemsList));
    }

    public isNumber(text) {
        return !isNaN(text);
    }

    public dialogMessage(title, message, buttonText) {
        let dialogs = require("ui/dialogs");
        return dialogs.alert({
            title: title,
            message: (message),
            okButtonText: buttonText
        });
    }

    public checkInternetConnection() {
        let connectionType = this._connectivityModule.getConnectionType();
        let connection = false;
        switch (connectionType) {
            case this._connectivityModule.connectionType.none:
                this.dialogMessage("Error", "Sin conexión a internet", "Cerrar");
                break;
            default:
                connection = true;
                break;
        }
        return connection;
    }

    public async delete() {
        let noSelectedItems = [];
        this.itemsList.map(item => {
            if (!item.Selected)
                noSelectedItems.push(item);
        });
        this.itemsList = noSelectedItems;
        this.cancelSelecting(true);
    }

    public notify(updateItems = true) {
        let dataEmit = {
            items: updateItems ? JSON.parse(JSON.stringify(this.items)) : this.itemsList,
            selectingState: this.selectingState,
            normalState: this.normalState
        };
        this.listEvent.emit(dataEmit);
    }

    public async verifyItemsSelected() {
        let selected = false;
        await Promise.all(this.itemsList.map(item => {
            selected = item.Selected ? true : selected;
        }));
        if (!selected)
            this.cancelSelecting(true);
    }

    public cancelSelecting(resetPrivateList = false) {
        this.selectingState = "collapse";
        this.normalState = "visible";
        setTimeout(() => {
            if (resetPrivateList) {
                this.items = JSON.parse(JSON.stringify(this.itemsList));
            }
            this.notify();
        }, 50);
    }

    public selectItem(index) {
        if (this.selectingState == "visible") {
            this.itemsList[index].Selected = !this.itemsList[index].Selected;
            this.verifyItemsSelected();
        }
        else {
            if (this.properties.navigation.routing)
                this.goToPage(this.properties.navigation.page, this.itemsList[index].OrderCode);
        }
    }

    public onLongPress(index) {
        this.selectingState = "visible";
        this.normalState = "collapse";
        this.itemsList[index].Selected = true;
        this.notify(false);
    }

    public goToPage(page, parameter = "") {
        parameter == "" ? this._router.navigate([`/${page}`]) : this._router.navigate([`/${page}`, parameter]);
        this.notify(false);
    }
}