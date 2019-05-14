import { HttpHeaders, HttpParams }                                             from '@angular/common/http';
import { Component, ContentChildren, forwardRef, Input, OnDestroy, QueryList } from '@angular/core';
import { merge, Observable, Subscription }                                     from 'rxjs';
import { startWith }                                                           from 'rxjs/operators';
import { NgxuxFileUploadComponent }                                            from './ngxux-file-upload/ngxux-file-upload.component';

@Component({
    selector: 'ngxux-file-uploader',
    template: `

        <ng-content></ng-content>

        <br>

        <button mat-raised-button color="warn" *ngIf="files.length > 0" (click)="removeAll()">Remove All</button>
        <button mat-raised-button color="primary" *ngIf="files.length > 0" (click)="uploadAll()">Upload All</button>

    `,

    styleUrls: [ './ngxux-file-uploader.component.scss' ]

})
export class NgxuxFileUploaderComponent implements OnDestroy {

    @ContentChildren(forwardRef(() => NgxuxFileUploadComponent)) fileUploads: QueryList<NgxuxFileUploadComponent>;

    @Input() public httpUrl: string;
    @Input() public httpRequestHeaders: HttpHeaders | { [ header: string ]: string | string[]; } = new HttpHeaders();
    @Input() public httpRequestParams: HttpParams | { [ param: string ]: string | string[]; } = new HttpParams();
    @Input() public fileAlias: string = 'file';
    public files: Array<any> = [];
    /** Subscription to remove changes in files. */
    private _fileRemoveSubscription: Subscription | null;
    /** Subscription to changes in the files. */
    private _changeSubscription: Subscription;

    /** Combined stream of all of the file upload remove change events. */
    // get fileUploadRemoveEvents(): Observable<NgxuxFileUploadComponent> {
    get fileUploadRemoveEvents(): Observable<any> {

        return merge(...this.fileUploads.map(fileUpload => fileUpload.removeEvent));

    }

    public ngAfterViewInit() {

        // When the list changes, re-subscribe
        this._changeSubscription = this.fileUploads.changes.pipe(startWith(null)).subscribe(() => {

            if (this._fileRemoveSubscription) {

                this._fileRemoveSubscription.unsubscribe();

            }

            this._listenTofileRemoved();

        });

    }

    public uploadAll() {

        this.fileUploads.forEach((fileUpload) => {

            fileUpload.upload();

        });

    }

    public removeAll() {

        this.files.splice(0, this.files.length);

    }

    public ngOnDestroy() {

        if (this.files) {

            this.removeAll();

        }

    }

    private _listenTofileRemoved(): void {

        // this._fileRemoveSubscription = this.fileUploadRemoveEvents.subscribe((event: NgxuxFileUploadComponent) => {
        //
        //     this.files.splice(event.id, 1);
        //
        // });

    }

    private add(file: any) {

        this.files.push(file);

    }

}
