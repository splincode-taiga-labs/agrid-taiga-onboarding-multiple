import {bootstrapApplication} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideEventPlugins} from '@taiga-ui/event-plugins';

import {AppComponent} from './app/app.component';
import {AppConfig, APP_CONFIG_PROVIDER} from './app/app-config';

AppConfig.load()
    .then(() =>
        bootstrapApplication(AppComponent, {
            providers: [APP_CONFIG_PROVIDER, provideAnimations(), provideEventPlugins()],
        }),
    )
    .catch(console.error);
