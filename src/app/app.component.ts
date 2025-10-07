import { Component, OnInit } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DatePipe, DecimalPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    NgIf,
    DecimalPipe
  ],
  styleUrl: 'app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Đếm ngày yêu 💖';
  startDateIso: string = '2024-11-30';
  boyName = 'Nguyễn Minh Lượng';
  girlName = 'Nguyễn Thanh Nga';

  days = 0 ;
  years = 0;
  months = 0;
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
    const parts = this.startDateIso.split('-').map(Number);
    const start = new Date(parts[0], parts[1] - 1, parts[2]);
    const now = new Date();

    // Tính số ngày yêu
    const diffMs = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) -
      Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
    this.days = totalDays;

    // Tính số năm, tháng, ngày
    let y = now.getFullYear() - start.getFullYear();
    let m = now.getMonth() - start.getMonth();
    let d = now.getDate() - start.getDate();
    if (d < 0) {
      m--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      d += prevMonth;
    }
    if (m < 0) {
      y--;
      m += 12;
    }
    this.years = y;
    this.months = m;

    // Ngày bắt đầu
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    this.prettySince = start.toLocaleDateString('vi-VN', options);
  }

  get durationString(): string {
    const parts = [];
    if (this.years > 0) parts.push(`${this.years} năm`);
    if (this.months > 0) parts.push(`${this.months} tháng`);
    parts.push(`${this.days} ngày`);
    return parts.join(' • ');
  }
}
