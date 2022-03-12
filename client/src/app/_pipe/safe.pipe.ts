import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) { }
  transform(value: any){
    return this.sanitized.bypassSecurityTrustHtml(value);
  }

}