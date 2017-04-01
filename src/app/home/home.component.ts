import { Component, ElementRef, OnInit } from '@angular/core';
import { GridsterConfig } from 'angular-gridster2/dist/gridsterConfig.interface';
import { QuestionService } from '../question/shared/question.service';
import { UserService } from '../user/shared/user.service';
import * as _ from 'lodash';
import { IGridsterDraggableOptions, IGridsterOptions } from 'angular2gridster';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public questions: Object[];
  public options: GridsterConfig;
  public gridsterConfig: IGridsterOptions = {
    lanes: 3,
    direction: 'vertical',
    dragAndDrop: true
  };
  public gridsterDraggableOptions: IGridsterDraggableOptions = {
    handlerClass: 'draggable-item'
  };
  public widgets: any[] = [
    {
      x: 0, y: 0, w: 1, h: 1,
      title: 'Basic form inputs 1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ' +
      'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ' +
      'commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla ' +
      'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est ' +
      'laborum.'
    },
    {
      x: 1, y: 0, w: 1, h: 1,
      title: 'Basic form inputs 2',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ' +
      'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ' +
      'commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla ' +
      'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est ' +
      'laborum.'
    },
    {
      x: 2, y: 0, w: 1, h: 1,
      title: 'Basic form inputs 3',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ' +
      'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ' +
      'commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla ' +
      'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est ' +
      'laborum.'
    },
    {
      x: 0, y: 1,  w: 1, h: 1,
      title: 'Basic form inputs 4',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ' +
      'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea ' +
      'commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla ' +
      'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est ' +
      'laborum.'
    }
  ];
  public loader = true;
  private users: Object[];
  private difference: Object[];
  private currentUser: any;
  private storage = localStorage;
  private colors = ['grey', 'red', 'purple', 'blue', 'green', 'yellow', 'orange'];

  constructor (
    public question: QuestionService,
    private user: UserService,
    private element: ElementRef
  ) {
    question.findAll(false)
        .subscribe(
          (questions) => {
              user.findAll().subscribe((users) => {
                this.users = users;

                _.forEach(questions, (question) => {
                  this.currentUser = _.find(
                    this.users,
                    (user) => user['id'] === parseInt(question.usr_id)
                  );

                  if (!_.isEmpty(this.currentUser)) {
                    question.name = this.currentUser.name;
                    question.surname = this.currentUser.surname;
                    question.color = this.getColorStorage(question);
                    question.initCallback = this.itemInit.bind(this);
                  }
                });

                this.questions = _.reverse(questions);
                this.loader = false;
              });
            },
          (err) => {
              console.log(err);
              this.loader = false;
            }
        );

  }

  public ngOnInit() {
    let margin: number = 13;
    let container: number = this.element.nativeElement.offsetWidth;
    let colWidth: number = (container - margin) / 3;

    // this.options = {
    //   gridType: 'fixed',
    //   compactUp: false,
    //   compactLeft: false,
    //   itemChangeCallback: this.itemChange.bind(this),
    //   margin: margin,
    //   maxCols: 3,
    //   fixedColWidth: colWidth,
    //   fixedRowHeight: 325,
    //   outerMargin: true,
    //   draggable: {
    //     enabled: true,
    //     stop: this.eventStop.bind(this)
    //   },
    //   swap: true
    // };

    this.question.findAll(true)
      .subscribe(
        (questions) => {
          this.user.findAll().subscribe((users) => {
            this.users = users;

            _.forEach(questions, (question) => {
              this.currentUser = _.find(
                this.users,
                (user) => user['id'] === parseInt(question.usr_id)
              );

              if (!_.isEmpty(this.currentUser)) {
                question.name = this.currentUser.name;
                question.surname = this.currentUser.surname;
                question.color = this.getColorStorage(question);
                question.initCallback = this.itemInit.bind(this);
              }
            });

            this.difference = _.differenceWith(
              questions, this.questions, (v1, v2) => v1.id === v2.id
            );

            console.log('difference', this.difference);

            if (this.difference.length > 0) {
              _.forEach(this.difference, (v) => this.questions.unshift(v));
            }

            console.log('question', this.questions);

            this.loader = false;
          });
        },
        (err) => {
          console.log(err);
          this.loader = false;
        }
      );
  }

  private eventStop(item, scope) {
    console.info('eventStop', item, scope);
  }

  private itemChange(item, scope) {
    console.info('itemChanged', item, scope);
    _.forEach(scope.gridster.state.grid,
      (v) => this.storage.setItem(
        `question_${v['id']}`,
        JSON.stringify({color: v.color, x: v['x'], y: v['y'], cols: v['cols'], rows: v['rows']})
      )
    );
  }

  private itemInit(item) {
    let getCoordStorage = this.storage.getItem(`question_${item.id}`);
    let currentCoord = {color: item.color, x: item.x, y: item.y, cols: item.cols, rows: item.rows};

    if (!_.isEmpty(getCoordStorage)) {
      _.merge(item, JSON.parse(getCoordStorage));
    } else {
      // TODO Set by storage on top !
      this.storage.setItem(`question_${item.id}`, JSON.stringify(currentCoord));
    }

    console.info('itemInitialized', item);
  }

  private getColorStorage(item) {
    let storageData = this.storage.getItem(`question_${item.id}`);
    let defaultColor = this.colors[0];

    if (storageData) {
      let dataParsed = JSON.parse(storageData);
      return (dataParsed.color) ? dataParsed.color : defaultColor;
    }

    return defaultColor;
  }

  public changeColor(item) {
    let getStorage = this.storage.getItem(`question_${item.id}`);
    let storageParsed = JSON.parse(getStorage);
    let myIndex = _.indexOf(this.colors, item.color);

    myIndex = (myIndex === -1) ? 0 : myIndex+1;

    item.color = this.colors[myIndex];

    // Store color
    storageParsed.color = item.color;
    this.storage.setItem(`question_${item.id}`, JSON.stringify(storageParsed));
  }
}
