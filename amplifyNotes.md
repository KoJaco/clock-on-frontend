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
