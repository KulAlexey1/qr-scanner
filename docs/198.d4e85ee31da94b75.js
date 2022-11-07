"use strict";(self.webpackChunkqr_scanner=self.webpackChunkqr_scanner||[]).push([[198],{4198:(P,c,a)=>{a.r(c),a.d(c,{GENERATOR_ROUTES:()=>E,GeneratorComponent:()=>T});var h=a(6895),l=a(4006),p=a(4859),u=a(3336),m=a(4144),f=a(455),M=a(945),C=a(1208),d=a(347),e=a(4650),g=a(9549);const b=["qrcodeContainer"];function v(o,i){1&o&&(e.TgZ(0,"mat-icon",13),e._uU(1,"qr_code"),e.qZA())}function Z(o,i){1&o&&(e.TgZ(0,"mat-icon",13),e._uU(1,"qr_code"),e.qZA())}let T=(()=>{class o{constructor(){this.dataLabel="\u0414\u0430\u043d\u043d\u044b\u0435",this.data="",this.secretPhrase="",this.cipherText="",this.encryptionEnabled=!1,this.dataMaxlength=d.g.qrDataMaxLength,this.secretKeyMaxlength=d.g.secretKeyMaxLength,this.cipherTextMaxlength=d.g.cipherTextMaxLength}ngOnInit(){this.generateCode(this.dataLabel)}onDataChange(n){this.data!==n&&(this.data=n,this.encryptionEnabled?this.generateCipherWithCode():this.generateCode(this.data))}onSecretPhraseChange(n){this.secretPhrase!==n&&(this.secretPhrase=n,this.generateCipherWithCode())}onEncryptionToggle(){this.encryptionEnabled=!this.encryptionEnabled,this.encryptionEnabled?this.generateCipherWithCode():this.generateCode(this.data)}onOpenQrInNewTab(){const n=this.qrcodeContainerRef.nativeElement.querySelector("svg");(class y{static openSvgInNewTab(i,n,t){const r=i.cloneNode(!0);r.setAttribute("height",n.toString()),r.setAttribute("width",t.toString());const s=(new XMLSerializer).serializeToString(r),O=new Blob([s],{type:"image/svg+xml"}),x=URL.createObjectURL(O);open(x).onload=U=>URL.revokeObjectURL(x)}}).openSvgInNewTab(n,250,250)}generateCipherWithCode(){this.generateCipherText(),this.generateCode(this.cipherText)}generateCipherText(){const n=C.p.encrypt(this.data,this.secretPhrase);this.cipherText=C.p.decrypt(n,this.secretPhrase)!==this.data?"\u041d\u0435 \u0443\u0434\u0430\u043b\u043e\u0441\u044c \u0437\u0430\u0448\u0438\u0444\u0440\u043e\u0432\u0430\u0442\u044c":n}generateCode(n){this.qrcodeContainerRef.nativeElement.innerHTML=M.u.generateCode(n)}}return o.\u0275fac=function(n){return new(n||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["qr-generator"]],viewQuery:function(n,t){if(1&n&&e.Gf(b,7),2&n){let r;e.iGM(r=e.CRH())&&(t.qrcodeContainerRef=r.first)}},standalone:!0,features:[e.jDz],decls:35,vars:17,consts:[[1,"header"],["mat-icon-button","","color","accent",1,"align-center",3,"click"],[1,"qrcode-container"],["qrcodeContainer",""],[1,"fields"],[1,"field-container"],["appearance","outline",1,"field"],["matInput","","rows","3",3,"maxlength","ngModel","ngModelChange"],["matSuffix","",4,"ngIf"],["align","end"],["color","accent",1,"enable-encryption","field",3,"ngModel","toggleChange"],["matInput","","rows","3",3,"maxlength","disabled","ngModel","ngModelChange"],["matInput","","rows","3","disabled","",3,"maxlength","ngModel"],["matSuffix",""]],template:function(n,t){1&n&&(e.TgZ(0,"section",0)(1,"button",1),e.NdJ("click",function(){return t.onOpenQrInNewTab()}),e.TgZ(2,"mat-icon"),e._uU(3,"open_in_new"),e.qZA()()(),e._UZ(4,"div",2,3),e.TgZ(6,"section",4)(7,"div",5)(8,"mat-form-field",6)(9,"mat-label"),e._uU(10),e.qZA(),e.TgZ(11,"textarea",7),e.NdJ("ngModelChange",function(s){return t.onDataChange(s)}),e.qZA(),e.YNc(12,v,2,0,"mat-icon",8),e.TgZ(13,"mat-hint",9),e._uU(14),e.qZA()()(),e.TgZ(15,"div",5)(16,"mat-slide-toggle",10),e.NdJ("toggleChange",function(){return t.onEncryptionToggle()}),e._uU(17," \u0428\u0438\u0444\u0440\u043e\u0432\u0430\u043d\u0438\u0435 "),e.qZA()(),e.TgZ(18,"div",5)(19,"mat-form-field",6)(20,"mat-label"),e._uU(21,"\u0421\u0435\u043a\u0440\u0435\u0442\u043d\u0430\u044f \u0444\u0440\u0430\u0437\u0430"),e.qZA(),e.TgZ(22,"textarea",11),e.NdJ("ngModelChange",function(s){return t.onSecretPhraseChange(s)}),e._uU(23,"            "),e.qZA(),e.TgZ(24,"mat-hint",9),e._uU(25),e.qZA()()(),e.TgZ(26,"div",5)(27,"mat-form-field",6)(28,"mat-label"),e._uU(29,"\u0428\u0438\u0444\u0440"),e.qZA(),e.TgZ(30,"textarea",12),e._uU(31,"            "),e.qZA(),e.YNc(32,Z,2,0,"mat-icon",8),e.TgZ(33,"mat-hint",9),e._uU(34),e.qZA()()()()),2&n&&(e.xp6(10),e.Oqu(t.dataLabel),e.xp6(1),e.Q6J("maxlength",t.dataMaxlength)("ngModel",t.data),e.xp6(1),e.Q6J("ngIf",!t.encryptionEnabled),e.xp6(2),e.AsE("",t.data.length,"/",t.dataMaxlength,""),e.xp6(2),e.Q6J("ngModel",t.encryptionEnabled),e.xp6(6),e.Q6J("maxlength",t.secretKeyMaxlength)("disabled",!t.encryptionEnabled)("ngModel",t.secretPhrase),e.xp6(3),e.AsE("",t.secretPhrase.length,"/",t.secretKeyMaxlength,""),e.xp6(5),e.Q6J("maxlength",t.cipherTextMaxlength)("ngModel",t.cipherText),e.xp6(2),e.Q6J("ngIf",t.encryptionEnabled),e.xp6(2),e.AsE("",t.cipherText.length,"/",t.cipherTextMaxlength,""))},dependencies:[h.ez,h.O5,l.u5,l.Fj,l.JJ,l.nD,l.On,p.ot,p.lW,u.Ps,u.Hw,m.c,g.KE,g.bx,g.hX,g.R9,m.Nt,f.rP,f.Rr],styles:["[_nghost-%COMP%]{background-color:#fff;padding:20px;border-radius:5px;align-self:center}.header[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:end}.fields[_ngcontent-%COMP%]   .field-container[_ngcontent-%COMP%]{display:flex}.fields[_ngcontent-%COMP%]   .field-container[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%]{flex-grow:1}.fields[_ngcontent-%COMP%]   .field-container[_ngcontent-%COMP%]   .enable-encryption[_ngcontent-%COMP%]{margin-bottom:5px}.qrcode-container[_ngcontent-%COMP%]{width:280px;height:280px}"]}),o})();const E=[{path:"",component:T}]}}]);