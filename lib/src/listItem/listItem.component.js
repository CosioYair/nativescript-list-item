"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var ListItemComponent = /** @class */ (function () {
    function ListItemComponent(_router) {
        this._router = _router;
        this.itemsList = [];
        this.listEvent = new core_1.EventEmitter();
        this._connectivityModule = require("tns-core-modules/connectivity");
        this.selectingState = "collapse";
        this.normalState = "visible";
    }
    ListItemComponent.prototype.ngOnInit = function () {
        this.items = JSON.parse(JSON.stringify(this.itemsList));
    };
    ListItemComponent.prototype.isNumber = function (text) {
        return !isNaN(text);
    };
    ListItemComponent.prototype.dialogMessage = function (title, message, buttonText) {
        var dialogs = require("ui/dialogs");
        return dialogs.alert({
            title: title,
            message: (message),
            okButtonText: buttonText
        });
    };
    ListItemComponent.prototype.checkInternetConnection = function () {
        var connectionType = this._connectivityModule.getConnectionType();
        var connection = false;
        switch (connectionType) {
            case this._connectivityModule.connectionType.none:
                this.dialogMessage("Error", "Sin conexión a internet", "Cerrar");
                break;
            default:
                connection = true;
                break;
        }
        return connection;
    };
    ListItemComponent.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var noSelectedItems;
            return __generator(this, function (_a) {
                noSelectedItems = [];
                this.itemsList.map(function (item) {
                    if (!item.Selected)
                        noSelectedItems.push(item);
                });
                this.itemsList = noSelectedItems;
                this.cancelSelecting(true);
                return [2 /*return*/];
            });
        });
    };
    ListItemComponent.prototype.notify = function (updateItems) {
        if (updateItems === void 0) { updateItems = true; }
        var dataEmit = {
            items: updateItems ? JSON.parse(JSON.stringify(this.items)) : this.itemsList,
            selectingState: this.selectingState,
            normalState: this.normalState
        };
        this.listEvent.emit(dataEmit);
    };
    ListItemComponent.prototype.verifyItemsSelected = function () {
        return __awaiter(this, void 0, void 0, function () {
            var selected;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        selected = false;
                        return [4 /*yield*/, Promise.all(this.itemsList.map(function (item) {
                                selected = item.Selected ? true : selected;
                            }))];
                    case 1:
                        _a.sent();
                        if (!selected)
                            this.cancelSelecting(true);
                        return [2 /*return*/];
                }
            });
        });
    };
    ListItemComponent.prototype.cancelSelecting = function (resetPrivateList) {
        var _this = this;
        if (resetPrivateList === void 0) { resetPrivateList = false; }
        this.selectingState = "collapse";
        this.normalState = "visible";
        setTimeout(function () {
            if (resetPrivateList) {
                _this.items = JSON.parse(JSON.stringify(_this.itemsList));
            }
            _this.notify();
        }, 50);
    };
    ListItemComponent.prototype.selectItem = function (index) {
        if (this.selectingState == "visible") {
            this.itemsList[index].Selected = !this.itemsList[index].Selected;
            this.verifyItemsSelected();
        }
        else {
            if (this.properties.navigation.routing)
                this.goToPage(this.properties.navigation.page, this.itemsList[index].OrderCode);
        }
    };
    ListItemComponent.prototype.onLongPress = function (index) {
        this.selectingState = "visible";
        this.normalState = "collapse";
        this.itemsList[index].Selected = true;
        this.notify(false);
    };
    ListItemComponent.prototype.goToPage = function (page, parameter) {
        if (parameter === void 0) { parameter = ""; }
        parameter == "" ? this._router.navigate(["/" + page]) : this._router.navigate(["/" + page, parameter]);
        this.notify(false);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ListItemComponent.prototype, "properties", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ListItemComponent.prototype, "itemsList", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ListItemComponent.prototype, "listEvent", void 0);
    ListItemComponent = __decorate([
        core_1.Component({
            selector: "ns-listItem",
            moduleId: module.id,
            templateUrl: "./listItem.component.html",
            styleUrls: ["./listItem.css"],
        }),
        __metadata("design:paramtypes", [router_1.Router])
    ], ListItemComponent);
    return ListItemComponent;
}());
exports.ListItemComponent = ListItemComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdEl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGlzdEl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBK0U7QUFDL0UsMENBQXlDO0FBU3pDO0lBV0ksMkJBQW9CLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBVDFCLGNBQVMsR0FBUSxFQUFFLENBQUM7UUFFbkIsY0FBUyxHQUFzQixJQUFJLG1CQUFZLEVBQU8sQ0FBQztRQUV6RCx3QkFBbUIsR0FBUSxPQUFPLENBQUMsK0JBQStCLENBQUMsQ0FBQztRQUNyRSxtQkFBYyxHQUFXLFVBQVUsQ0FBQztRQUNwQyxnQkFBVyxHQUFXLFNBQVMsQ0FBQztJQUl2QyxDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFTSxvQ0FBUSxHQUFmLFVBQWdCLElBQUk7UUFDaEIsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFTSx5Q0FBYSxHQUFwQixVQUFxQixLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVU7UUFDM0MsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ2pCLEtBQUssRUFBRSxLQUFLO1lBQ1osT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO1lBQ2xCLFlBQVksRUFBRSxVQUFVO1NBQzNCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTSxtREFBdUIsR0FBOUI7UUFDSSxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsbUJBQW1C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SnhELGlCQUFpQjtRQVA3QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGFBQWE7WUFDdkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSwyQkFBMkI7WUFDeEMsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7U0FDaEMsQ0FBQzt5Q0FhK0IsZUFBTTtPQVgxQixpQkFBaUIsQ0EwRzdCO0lBQUQsd0JBQUM7Q0FBQSxBQTFHRCxJQTBHQztBQTFHWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1saXN0SXRlbVwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbGlzdEl0ZW0uY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9saXN0SXRlbS5jc3NcIl0sXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgTGlzdEl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQElucHV0KCkgcHJvcGVydGllczogYW55O1xyXG4gICAgQElucHV0KCkgaXRlbXNMaXN0OiBhbnkgPSBbXTtcclxuXHJcbiAgICBAT3V0cHV0KCkgbGlzdEV2ZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIHByaXZhdGUgX2Nvbm5lY3Rpdml0eU1vZHVsZTogYW55ID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvY29ubmVjdGl2aXR5XCIpO1xyXG4gICAgcHVibGljIHNlbGVjdGluZ1N0YXRlOiBzdHJpbmcgPSBcImNvbGxhcHNlXCI7XHJcbiAgICBwdWJsaWMgbm9ybWFsU3RhdGU6IHN0cmluZyA9IFwidmlzaWJsZVwiO1xyXG4gICAgcHVibGljIGl0ZW1zOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dGVyOiBSb3V0ZXIpIHtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLml0ZW1zID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLml0ZW1zTGlzdCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc051bWJlcih0ZXh0KSB7XHJcbiAgICAgICAgcmV0dXJuICFpc05hTih0ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGlhbG9nTWVzc2FnZSh0aXRsZSwgbWVzc2FnZSwgYnV0dG9uVGV4dCkge1xyXG4gICAgICAgIGxldCBkaWFsb2dzID0gcmVxdWlyZShcInVpL2RpYWxvZ3NcIik7XHJcbiAgICAgICAgcmV0dXJuIGRpYWxvZ3MuYWxlcnQoe1xyXG4gICAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IChtZXNzYWdlKSxcclxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBidXR0b25UZXh0XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoZWNrSW50ZXJuZXRDb25uZWN0aW9uKCkge1xyXG4gICAgICAgIGxldCBjb25uZWN0aW9uVHlwZSA9IHRoaXMuX2Nvbm5lY3Rpdml0eU1vZHVsZS5nZXRDb25uZWN0aW9uVHlwZSgpO1xyXG4gICAgICAgIGxldCBjb25uZWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgc3dpdGNoIChjb25uZWN0aW9uVHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIHRoaXMuX2Nvbm5lY3Rpdml0eU1vZHVsZS5jb25uZWN0aW9uVHlwZS5ub25lOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5kaWFsb2dNZXNzYWdlKFwiRXJyb3JcIiwgXCJTaW4gY29uZXhpw7NuIGEgaW50ZXJuZXRcIiwgXCJDZXJyYXJcIik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb25uZWN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBkZWxldGUoKSB7XHJcbiAgICAgICAgbGV0IG5vU2VsZWN0ZWRJdGVtcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuaXRlbXNMaXN0Lm1hcChpdGVtID0+IHtcclxuICAgICAgICAgICAgaWYgKCFpdGVtLlNlbGVjdGVkKVxyXG4gICAgICAgICAgICAgICAgbm9TZWxlY3RlZEl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5pdGVtc0xpc3QgPSBub1NlbGVjdGVkSXRlbXM7XHJcbiAgICAgICAgdGhpcy5jYW5jZWxTZWxlY3RpbmcodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5vdGlmeSh1cGRhdGVJdGVtcyA9IHRydWUpIHtcclxuICAgICAgICBsZXQgZGF0YUVtaXQgPSB7XHJcbiAgICAgICAgICAgIGl0ZW1zOiB1cGRhdGVJdGVtcyA/IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5pdGVtcykpIDogdGhpcy5pdGVtc0xpc3QsXHJcbiAgICAgICAgICAgIHNlbGVjdGluZ1N0YXRlOiB0aGlzLnNlbGVjdGluZ1N0YXRlLFxyXG4gICAgICAgICAgICBub3JtYWxTdGF0ZTogdGhpcy5ub3JtYWxTdGF0ZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5saXN0RXZlbnQuZW1pdChkYXRhRW1pdCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHZlcmlmeUl0ZW1zU2VsZWN0ZWQoKSB7XHJcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gZmFsc2U7XHJcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwodGhpcy5pdGVtc0xpc3QubWFwKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBzZWxlY3RlZCA9IGl0ZW0uU2VsZWN0ZWQgPyB0cnVlIDogc2VsZWN0ZWQ7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIGlmICghc2VsZWN0ZWQpXHJcbiAgICAgICAgICAgIHRoaXMuY2FuY2VsU2VsZWN0aW5nKHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBjYW5jZWxTZWxlY3RpbmcocmVzZXRQcml2YXRlTGlzdCA9IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RpbmdTdGF0ZSA9IFwiY29sbGFwc2VcIjtcclxuICAgICAgICB0aGlzLm5vcm1hbFN0YXRlID0gXCJ2aXNpYmxlXCI7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXNldFByaXZhdGVMaXN0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLml0ZW1zTGlzdCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubm90aWZ5KCk7XHJcbiAgICAgICAgfSwgNTApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZWxlY3RJdGVtKGluZGV4KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW5nU3RhdGUgPT0gXCJ2aXNpYmxlXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtc0xpc3RbaW5kZXhdLlNlbGVjdGVkID0gIXRoaXMuaXRlbXNMaXN0W2luZGV4XS5TZWxlY3RlZDtcclxuICAgICAgICAgICAgdGhpcy52ZXJpZnlJdGVtc1NlbGVjdGVkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wZXJ0aWVzLm5hdmlnYXRpb24ucm91dGluZylcclxuICAgICAgICAgICAgICAgIHRoaXMuZ29Ub1BhZ2UodGhpcy5wcm9wZXJ0aWVzLm5hdmlnYXRpb24ucGFnZSwgdGhpcy5pdGVtc0xpc3RbaW5kZXhdLk9yZGVyQ29kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkxvbmdQcmVzcyhpbmRleCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0aW5nU3RhdGUgPSBcInZpc2libGVcIjtcclxuICAgICAgICB0aGlzLm5vcm1hbFN0YXRlID0gXCJjb2xsYXBzZVwiO1xyXG4gICAgICAgIHRoaXMuaXRlbXNMaXN0W2luZGV4XS5TZWxlY3RlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkoZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnb1RvUGFnZShwYWdlLCBwYXJhbWV0ZXIgPSBcIlwiKSB7XHJcbiAgICAgICAgcGFyYW1ldGVyID09IFwiXCIgPyB0aGlzLl9yb3V0ZXIubmF2aWdhdGUoW2AvJHtwYWdlfWBdKSA6IHRoaXMuX3JvdXRlci5uYXZpZ2F0ZShbYC8ke3BhZ2V9YCwgcGFyYW1ldGVyXSk7XHJcbiAgICAgICAgdGhpcy5ub3RpZnkoZmFsc2UpO1xyXG4gICAgfVxyXG59Il19