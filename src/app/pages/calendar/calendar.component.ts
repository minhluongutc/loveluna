import {Component, OnInit, ViewChild} from '@angular/core';
import {FullCalendarComponent, FullCalendarModule} from "@fullcalendar/angular";
import {CalendarOptions, DateSelectArg, EventClickArg, EventInput} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import viLocale from '@fullcalendar/core/locales/vi';
import {ActivatedRoute, Router} from "@angular/router";
import {ViewType} from "../../models/Types.type";
import {NzDrawerComponent, NzDrawerContentDirective} from "ng-zorro-antd/drawer";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzSwitchComponent} from "ng-zorro-antd/switch";

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    FullCalendarModule,
    NzDrawerComponent,
    NzDrawerContentDirective,
    NzButtonComponent,
    NzInputDirective,
    FormsModule,
    NzColDirective,
    NzRowDirective,
    NzInputGroupComponent,
    NzSwitchComponent
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
class CalendarComponent implements OnInit {
  visibleModel = true;
  calendarOptions!: CalendarOptions;
  listEvent: EventInput[] = []
  @ViewChild('calendar') calendarComponent: FullCalendarComponent | undefined;
  switchValue = false;

  constructor(private route: ActivatedRoute, private router: Router) {
    console.log("CalendarComponent constructor");
    this.calendarOptions = {
      plugins: [
        interactionPlugin,
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
      ],
      headerToolbar: {
        left: 'title',
        center: 'prev,next today',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialView: 'timeGridWeek', // alternatively, use the `events` setting to fetch from a feed
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      droppable: true,
      locale: viLocale,
      // drop: this.onDropEvent.bind(this),
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      // eventsSet: this.handleEvents.bind(this),
      // eventChange: this.handleChange.bind(this)
      /* you can update a remote database when these fire:
      eventAdd:
      eventRemove:
      */
    };
    console.log(this.calendarOptions)
  }

  async ngOnInit() {
    console.log("CalendarComponent ngOnInit");
    this.route.queryParams.subscribe((params) => {
      const view = params['view'] || 'dayGridMonth';
      const date = params['date'] ? new Date(params['date']) : new Date();
      const calendarApi = this.calendarComponent?.getApi();
      if (calendarApi) {
        calendarApi.changeView(view);
        calendarApi.gotoDate(date)
      }
    });
  }

  async handleEventClick(clickInfo: EventClickArg) {
    console.log("onclick: ", clickInfo);
  }

  async handleDateSelect(selectInfo: DateSelectArg) {
    console.log("onselect: ", selectInfo);
    if (selectInfo.view.type == 'dayGridMonth') {
      this.changeView("timeGridDay", selectInfo.start);
    }

    this.openModel();
  }

  changeView(viewName: ViewType, date: Date) {
    console.log('view changed!')
    // 🔹 Cập nhật param trong URL
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {view: viewName, date: date},
      queryParamsHandling: 'merge', // giữ lại các param khác
    });
  }

  openModel(): void {
    this.visibleModel = true;
  }

  closeModel(): void {
    this.visibleModel = false;
  }
}

export default CalendarComponent
