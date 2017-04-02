import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question/shared/question.service';
import { UserService } from '../user/shared/user.service';
import * as _ from 'lodash';
import { IGridsterDraggableOptions, IGridsterOptions } from 'angular2gridster';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public questions: Object[];
  public showEmptyState: boolean = false;
  public gridsterConfig: IGridsterOptions = {
    lanes: 3,
    direction: 'vertical',
    widthHeightRatio: 1.5,
    dragAndDrop: true,
    onChange: this.itemChange
  };
  public gridsterDraggableOptions: IGridsterDraggableOptions = {
    handlerClass: 'draggable-item'
  };
  public loader = true;
  public storageMode = false;
  private users: Object[];
  private difference: Object[];
  private currentUser: any;
  private storage = localStorage;
  private colors = ['grey', 'red', 'purple', 'blue', 'green', 'yellow', 'orange'];

  constructor (
    public question: QuestionService,
    private user: UserService,
    private snackBar: MdSnackBar,
  ) {
    question.findAll(false)
        .subscribe(
          (questions) => {
            if (!_.isEmpty(questions)) {
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
                    let coord = this.getCoordStorage(question);
                    if (coord) {
                      this.storageMode = true;
                      question['x'] = coord['x'];
                      question['y'] = coord['y'];
                    }
                  }
                });

                this.questions = _.reverse(questions);
                if (!this.storageMode) {
                  this.setCoord(this.questions);
                  this.itemChange();
                }
                this.loader = false;
              });
            } else {
              this.showEmptyState = true;
            }
          },
          (err) => {
              console.log(err);
              this.loader = false;
            }
        );

  }

  public setCoord(items) {
    // 0 <= 2 x | y
    let length = this.questions.length - 1;
    let x = (this.questions[length]['x']) ? this.questions[length]['x'] : 0;
    let y = (this.questions[length]['y']) ? this.questions[length]['y'] : 0;

    if (this.questions[length]['x'] >= 0) {
      x = x + 1;
    }

    for (const value of items) {
      // If end of the line
      if (x === 3) {
        x = 0;
        y++;
      }

      value.x = x;
      value.y = y;

      x++;
    }

    return items;
  }

  public ngOnInit() {
    this.question.findAll(true)
      .subscribe(
        (questions) => {
          if (!_.isEmpty(questions)) {
            this.showEmptyState = false;

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
                  let coord = this.getCoordStorage(question);
                  if (coord) {
                    this.storageMode = true;
                    question['x'] = coord['x'];
                    question['y'] = coord['y'];
                  }
                }
              });

              this.difference = _.differenceWith(
                questions, this.questions, (v1, v2) => v1.id === v2.id
              );

              console.log('difference', this.difference);

              let message = undefined;

              if (this.difference.length > 0) {
                this.setCoord(this.difference);
                _.forEach(this.difference, (v) => this.questions.push(v));

                this.itemChange();
                message = this.difference.length + ' new card(s) loaded !';
              }

              if (message) {
                this.snackBar.open(message, '', {
                  duration: 3000
                });
              }


              console.log('question', this.questions);

              this.loader = false;
            });
          }
        },
        (err) => {
          console.log(err);
          this.loader = false;
        }
      );
  }

  public changeColor(item) {
    let getStorage = this.storage.getItem(`question_${item.id}`);
    let storageParsed = JSON.parse(getStorage);
    let myIndex = _.indexOf(this.colors, item.color);

    myIndex = (myIndex === -1) ? 0 : myIndex + 1;

    item.color = this.colors[myIndex];

    // Store color
    storageParsed.color = item.color;
    this.storage.setItem(`question_${item.id}`, JSON.stringify(storageParsed));
  }

  private itemChange(items: any) {
    if (!items) {
      _.forEach(this.questions,
        (v) => this.storage.setItem(
          `question_${v['id']}`,
          JSON.stringify({color: v['color'], x: v['x'], y: v['y']})
        )
      );
    } else {
      _.forEach(items,
        (v) => this.storage.setItem(
          `question_${v.$element['id']}`,
          JSON.stringify({color: v.$element['lang'], x: v['x'], y: v['y']})
        )
      );
    }
  }

  private getCoordStorage(item) {
    let storageData = this.storage.getItem(`question_${item.id}`);
    if (_.isEmpty(storageData)) {
      return false;
    }

    return JSON.parse(storageData);
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
}
