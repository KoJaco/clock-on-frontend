### Docus

* Studio
https://docs.amplify.aws/console/

* CLI
https://docs.amplify.aws/cli/


### AWS Cognito
https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-app-ui-customization.html

### Storage

* Public
    --> put
        import { Storage } from "@aws-amplify/storage"
        await Storage.put("text.txt", "hello")
    
    --> download
        import { Storage } from "@aws-amplify/storage"

        await Storage.get('test.txt', { 
            level: 'public'
        });

    --> list
        import { Storage } from "@aws-amplify/storage"

        Storage.list('photos/') // for listing ALL files without prefix, pass '' instead
                .then(result => console.log(result))
                .catch(err => console.log(err));
    --> remove
        import { Storage } from "@aws-amplify/storage"

        await Storage.remove('test.txt');


* Protected
    --> put 
        import { Storage } from "@aws-amplify/storage"
        await Storage.put('test.txt', 'Protected Content', {
            level: 'protected',
            contentType: 'text/plain'
        });
    
    --> download
        import { Storage } from "@aws-amplify/storage"
        await Storage.get('test.txt', { 
            level: 'protected'
            identityId: 'xxxxxxx' // The identityId of that user. Omit to get current user's objects.
        });
    
    --> list
        import { Storage } from "@aws-amplify/storage"

        Storage.list('photos/', { 
                level: 'protected', 
                identityId: 'xxxxxxx' // The identityId of that user. Omit to get current user's objects.
            })
            .then(result => console.log(result))
            .catch(err => console.log(err));
    
    --> remove
        import { Storage } from "@aws-amplify/storage"

        await Storage.remove('test.txt', { level: 'protected' });



* Private
    --> put       
        import { Storage } from "@aws-amplify/storage"

        await Storage.put('test.txt', 'Private Content', {
            level: 'private',
            contentType: 'text/plain'
        });

    --> download
        import { Storage } from "@aws-amplify/storage"

        await Storage.get('test.txt', { 
            level: 'private'
        });

    --> list
        import { Storage } from "@aws-amplify/storage"

        Storage.list('photos/', { level: 'private' })
                .then(result => console.log(result))
                .catch(err => console.log(err));
    
    --> remove
        import { Storage } from "@aws-amplify/storage"

        await Storage.remove('test.txt', { level: 'private' });


### Amplify functions



### Data
import { DataStore } from '@aws-amplify/datastore';
import { Note } from './models'; // import { <ModelName> } from './models'


* Create

await DataStore.save(
    new Note({
		"Tags": [],
		"title":  /* Provide init commands */,
		"content": "Lorem ipsum dolor sit amet",
		"createdAt": "1970-01-01T12:30:23.999Z",
		"updatedAt": "1970-01-01T12:30:23.999Z",
		"revisedTime": "1970-01-01T12:30:23.999Z"
	})
);


* Update

/* Models in DataStore are immutable. To update a record you must use the copyOf function
 to apply updates to the item’s fields rather than mutating the instance directly 
 */
await DataStore.save(Note.copyOf(CURRENT_ITEM, item => {
    // Update the values on {item} variable to update DataStore entry
}));


* Delete

const modelToDelete = await DataStore.query(Note, 123456789);
DataStore.delete(modelToDelete);


* Query

const models = await DataStore.query(Note);
console.log(models);


### Authorization

https://docs.amplify.aws/console/authz/authorization/#to-set-the-authorization-mode


### API

* production ready api
    - To configure PRODUCTION-READY authorization rules, review: https://docs.amplify.aws/cli/graphql/authorization-rules



