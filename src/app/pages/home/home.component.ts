import { Component } from '@angular/core';
import {DecimalPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzWaveDirective} from "ng-zorro-antd/core/wave";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DecimalPipe,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'Đếm ngày yêu 💖';
  startDateIso: string = '2024-11-30';
  boyName = 'Nguyễn Minh Lượng';
  girlName = 'Nguyễn Thanh Nga';

  days = 0;
  years = 0;
  months = 0;
  totalDays = 0;
  prettySince = '';
  timerId: any;

  ngOnInit(): void {
    this.recalc();
    this.timerId = setInterval(() => this.recalc(), 60_000);
  }

  ngOnDestroy(): void {
    if (this.timerId) clearInterval(this.timerId);
  }

  recalc() {
    const parts: number[] = this.startDateIso.split('-').map(Number);
    const start: Date = new Date(parts[0], parts[1] - 1, parts[2]);
    const now: Date = new Date();
    const diff = this.diffFromNow(start);
    this.months = diff.months % 12;
    this.years = Math.floor(diff.months / 12);
    this.days = diff.days;
    this.totalDays = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    // Ngày bắt đầu
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    this.prettySince = start.toLocaleDateString('vi-VN', options);
  }

  get durationString(): string {
    console.log(this.years, this.months, this.days);
    const parts = [];
    if (this.years > 0) parts.push(`${this.years} năm`);
    if (this.months > 0) parts.push(`${this.months} tháng`);
    parts.push(`${this.days} ngày`);
    return parts.join(' • ');
  }

  diffFromNow(pastDate: Date): { months: number; days: number } {
    const now = new Date();

    // Đảm bảo pastDate không lớn hơn hiện tại
    if (pastDate > now) {
      throw new Error("Ngày trong quá khứ không thể lớn hơn ngày hiện tại");
    }

    // Tính năm, tháng, ngày riêng lẻ
    let years = now.getFullYear() - pastDate.getFullYear();
    let months = now.getMonth() - pastDate.getMonth();
    let days = now.getDate() - pastDate.getDate();

    // Nếu số ngày âm => mượn tháng trước
    if (days < 0) {
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }

    // Nếu số tháng âm => mượn 1 năm
    if (months < 0) {
      months += 12;
      years--;
    }

    // Tổng số tháng bao gồm cả năm
    const totalMonths = years * 12 + months;

    return { months: totalMonths, days };
  }
}
