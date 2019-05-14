import { CommonModule }                                                        from '@angular/common';
import { HttpClientModule }                                                    from '@angular/common/http';
import { NgModule }                                                            from '@angular/core';
import { MatButtonModule, MatCardModule, MatIconModule, MatProgressBarModule } from '@angular/material';
import { BytesPipe }                                                           from './bytes.pipe';
import { FileUploadInputFor }                                                  from './fileUploadInputFor.directive';
import { NgxuxFileUploadComponent }                                            from './ngxux-file-upload/ngxux-file-upload.component';
import { NgxuxFileUploaderComponent }                                          from './ngxux-file-uploader.component';

@NgModule({
    declarations: [

        NgxuxFileUploaderComponent,

        NgxuxFileUploadComponent,

        BytesPipe,
        FileUploadInputFor
    ],
    imports: [

        CommonModule,
        MatButtonModule,
        MatProgressBarModule,
        MatIconModule,
        MatCardModule,
        HttpClientModule,
    ],
    exports: [

        NgxuxFileUploaderComponent,
        NgxuxFileUploadComponent,

        BytesPipe,
        FileUploadInputFor
    ]
})
export class NgxuxFileUploaderModule {
}
