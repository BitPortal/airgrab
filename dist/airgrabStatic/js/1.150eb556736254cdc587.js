webpackJsonp([1],{ETjk:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={name:"KARMA",mixins:[{methods:{regNum:function(t){t.target.value=t.target.value.replace(/[^\d]/g,"")}}}],data:function(){return{data:{},active:0,address:"",userName:"",powerUpQuantity:"",powerDownQuantity:"",permission:"active",total:"0.0000",powerUp:"0.0000",refunding:"0.0000"}},computed:{powerUpData:function(){return{actions:[{account:"therealkarma",name:"powerup",authorization:[{actor:this.userName,permission:this.permission}],data:{owner:this.userName,quantity:this.powerUpQuantity+" KARMA"}}],address:this.address,account:this.userName}},powerDownData:function(){return{actions:[{account:"therealkarma",name:"powerdown",authorization:[{actor:this.userName,permission:this.permission}],data:{owner:this.userName,quantity:this.powerDownQuantity+" KARMA"}}],address:this.address,account:this.userName}}},methods:{quantityCheck:function(t,e){return""===t?(this.$dialog.alert({message:e+"数量不能为空"}),!1):t<=0?(this.$dialog.alert({message:e+"数量必须大于0"}),!1):t>this.total&&"抵押"===e?(this.$dialog.alert({message:e+"不能大于"+this.total}),!1):!(t>this.powerUp&&"赎回"===e)||(this.$dialog.alert({message:e+"不能大于"+this.powerUp}),!1)},submitPowerUp:function(){var t=this;this.quantityCheck(this.powerUpQuantity,"抵押")&&(this.powerUpQuantity=Number(this.powerUpQuantity).toFixed(4),console.log(this.powerUpData),this.$tp.pushEosAction(this.powerUpData).then(function(e){e.result&&t.getInfo()}))},submitPowerDown:function(){var t=this;this.quantityCheck(this.powerDownQuantity,"赎回")&&(this.powerDownQuantity=Number(this.powerDownQuantity).toFixed(4),this.$tp.pushEosAction(this.powerDownData).then(function(e){e.result&&t.getInfo()}))},getRefundingTable:function(){var t=this;this.$tp.getTableRows({json:!0,code:"therealkarma",scope:this.userName,table:"refunding",lower_bound:"10",limit:500}).then(function(e){e.result&&e.data.rows.length>0&&(t.refunding=e.data.rows[0].quantity.replace(" KARMA",""))})},getPowerTable:function(){var t=this;this.$tp.getTableRows({json:!0,code:"therealkarma",scope:this.userName,table:"power",lower_bound:"10",limit:500}).then(function(e){e.result&&(console.log(e,2222),e.data.rows.length>0&&(t.powerUp=e.data.rows[0].quantity.replace(" KARMA","")))})},getBalance:function(){var t=this;this.$tp.getEosBalance({account:this.userName,contract:"therealkarma",symbol:"KARMA"}).then(function(e){e.result&&e.data.balance.length>0&&(t.total=e.data.balance[0].replace(" KARMA",""))})},getInfo:function(){var t=this;this.$tp.getCurrentWallet().then(function(e){e.result&&(t.address=e.data.address,t.userName=e.data.name,t.getBalance(),t.getRefundingTable(),t.getPowerTable())})}},created:function(){this.getInfo()}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"KARMA"},[a("header",[a("div",[t._v("Account："+t._s(t.userName))]),t._v(" "),a("p",[t._v("Total："+t._s(t.total)+" KARMA")]),t._v(" "),a("p",[t._v("Powered Up："+t._s(t.powerUp)+" KARMA")]),t._v(" "),a("p",[t._v("Refunding："+t._s(t.refunding)+" KARMA")]),t._v(" "),t.powerUp>0?a("p",[t._v("Reward time ")]):t._e()]),t._v(" "),a("main",[a("van-tabs",{model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[a("van-tab",{staticClass:"karma-tab",attrs:{title:"Power up"}},[a("div",{staticClass:"karma-title"},[t._v("\n          Power Up your KARMA -\n          "),a("small",[t._v("Earn more KARMA!")])]),t._v(" "),a("van-cell-group",[a("van-field",{attrs:{type:"number",required:"",clearable:"",label:"Quantity"},model:{value:t.powerUpQuantity,callback:function(e){t.powerUpQuantity=e},expression:"powerUpQuantity"}})],1),t._v(" "),a("div",[a("p",[t._v("By executing this action you are agreeing to the EOS constitution and this action's associated ricardian contract. The ricardian contract may be viewed in the Scatter approval prompt.")])]),t._v(" "),a("div",{staticClass:"txc"},[a("van-button",{staticClass:"karma-btn",attrs:{type:"default"},on:{click:t.submitPowerUp}},[t._v("POWER UP")])],1)],1),t._v(" "),a("van-tab",{staticClass:"karma-tab",attrs:{title:"Power down"}},[a("div",{staticClass:"karma-title"},[t._v("\n          Power Down your KARMA -\n          "),a("small",[t._v("You don't want more KARMA?")])]),t._v(" "),a("van-cell-group",[a("van-field",{attrs:{type:"number",required:"",clearable:"",label:"Quantity"},model:{value:t.powerDownQuantity,callback:function(e){t.powerDownQuantity=e},expression:"powerDownQuantity"}})],1),t._v(" "),a("div",[a("p",[t._v("By executing this action you are agreeing to the EOS constitution and this action's associated ricardian contract. The ricardian contract may be viewed in the Scatter approval prompt.")])]),t._v(" "),a("div",{staticClass:"txc"},[a("van-button",{staticClass:"karma-btn",attrs:{type:"default"},on:{click:t.submitPowerDown}},[t._v("POWER DOWN")])],1)],1)],1)],1)])},staticRenderFns:[]};var r=a("VU/8")(n,i,!1,function(t){a("FGBv")},"data-v-7da7a48b",null);e.default=r.exports},FGBv:function(t,e){}});
//# sourceMappingURL=1.150eb556736254cdc587.js.map