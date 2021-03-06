declare namespace Kurve {
    class Error {
        status: number;
        statusText: string;
        text: string;
        other: any;
    }
    interface PromiseCallback<T> {
        (error: Error, result?: T): void;
    }
    class Deferred<T, E> {
        private _dispatcher;
        constructor();
        constructor(dispatcher: (closure: () => void) => void);
        private DispatchDeferred(closure);
        then(successCB: any, errorCB: any): any;
        resolve(value?: T): Deferred<T, E>;
        resolve(value?: Promise<T, E>): Deferred<T, E>;
        private _resolve(value);
        reject(error?: E): Deferred<T, E>;
        private _reject(error?);
        promise: Promise<T, E>;
        private _stack;
        private _state;
        private _value;
        private _error;
    }
    class Promise<T, E> {
        private _deferred;
        constructor(_deferred: Deferred<T, E>);
        then<R>(successCallback?: (result: T) => R, errorCallback?: (error: E) => R): any;
        fail<R>(errorCallback?: (error: E) => R): any;
    }
}
declare namespace Kurve {
    enum EndpointVersion {
        v1 = 1,
        v2 = 2,
    }
    enum Mode {
        Client = 1,
        Node = 2,
    }
    interface TokenStorage {
        add(key: string, token: any): any;
        remove(key: string): any;
        getAll(): any[];
        clear(): any;
    }
    class IdToken {
        Token: string;
        IssuerIdentifier: string;
        SubjectIdentifier: string;
        Audience: string;
        Expiry: Date;
        UPN: string;
        TenantId: string;
        FamilyName: string;
        GivenName: string;
        Name: string;
        PreferredUsername: string;
        FullToken: any;
    }
    interface IdentitySettings {
        endpointVersion?: EndpointVersion;
        mode?: Mode;
        appSecret?: string;
        tokenStorage?: TokenStorage;
    }
    class Identity {
        clientId: string;
        tokenProcessorUrl: string;
        private state;
        private nonce;
        private idToken;
        private loginCallback;
        private getTokenCallback;
        private tokenCache;
        private refreshTimer;
        private policy;
        private appSecret;
        private NodePersistDataCallBack;
        private NodeRetrieveDataCallBack;
        private req;
        private res;
        endpointVersion: EndpointVersion;
        mode: Mode;
        https: any;
        constructor(clientId: string, tokenProcessorUrl: string, options?: IdentitySettings);
        private parseQueryString(str);
        private token(s, url);
        checkForIdentityRedirect(): boolean;
        private decodeIdToken(idToken);
        private decodeAccessToken(accessToken, resource?, scopes?);
        getIdToken(): any;
        isLoggedIn(): boolean;
        private renewIdToken();
        getAccessTokenAsync(resource: string): Promise<string, Error>;
        getAccessToken(resource: string, callback: PromiseCallback<string>): void;
        private parseNodeCookies(req);
        handleNodeCallback(req: any, res: any, https: any, crypto: any, persistDataCallback: (key: string, value: string, expiry: Date) => void, retrieveDataCallback: (key: string) => string): Promise<boolean, Error>;
        getAccessTokenForScopesAsync(scopes: string[], promptForConsent?: boolean): Promise<string, Error>;
        getAccessTokenForScopes(scopes: string[], promptForConsent: any, callback: (token: string, error: Error) => void): void;
        loginAsync(loginSettings?: {
            scopes?: string[];
            policy?: string;
            tenant?: string;
        }): Promise<void, Error>;
        login(callback: (error: Error) => void, loginSettings?: {
            scopes?: string[];
            policy?: string;
            tenant?: string;
        }): void;
        loginNoWindowAsync(toUrl?: string): Promise<void, Error>;
        loginNoWindow(callback: (error: Error) => void, toUrl?: string): void;
        logOut(): void;
        private base64Decode(encodedString);
        private generateNonce();
    }
}
declare namespace Kurve {
    class Graph {
        private req;
        private accessToken;
        private KurveIdentity;
        private defaultResourceID;
        private https;
        root: string;
        mode: Mode;
        endpointVersion: EndpointVersion;
        constructor(id: Identity, options?: {
            root?: string;
        });
        constructor(id: string, options?: {
            root?: string;
            endpointVersion: EndpointVersion;
            mode?: Mode;
            https?: any;
        });
        me: User;
        users: Users;
        groups: Groups;
        get(url: string, callback: PromiseCallback<string>, responseType?: string, scopes?: string[]): void;
        private findAccessToken(callback, scopes?);
        post(object: string, url: string, callback: PromiseCallback<string>, responseType?: string, scopes?: string[]): void;
        private generateError(xhr);
        private addAccessTokenAndSend(xhr, callback, scopes?);
    }
}
declare namespace Kurve {
    interface ItemBody {
        contentType?: string;
        content?: string;
    }
    interface EmailAddress {
        name?: string;
        address?: string;
    }
    interface Recipient {
        emailAddress?: EmailAddress;
    }
    interface UserDataModel {
        businessPhones?: string;
        displayName?: string;
        givenName?: string;
        jobTitle?: string;
        mail?: string;
        mobilePhone?: string;
        officeLocation?: string;
        preferredLanguage?: string;
        surname?: string;
        userPrincipalName?: string;
        id?: string;
    }
    interface ProfilePhotoDataModel {
        id?: string;
        height?: Number;
        width?: Number;
    }
    interface MessageDataModel {
        attachments?: AttachmentDataModel[];
        bccRecipients?: Recipient[];
        body?: ItemBody;
        bodyPreview?: string;
        categories?: string[];
        ccRecipients?: Recipient[];
        changeKey?: string;
        conversationId?: string;
        createdDateTime?: string;
        from?: Recipient;
        graph?: any;
        hasAttachments?: boolean;
        id?: string;
        importance?: string;
        isDeliveryReceiptRequested?: boolean;
        isDraft?: boolean;
        isRead?: boolean;
        isReadReceiptRequested?: boolean;
        lastModifiedDateTime?: string;
        parentFolderId?: string;
        receivedDateTime?: string;
        replyTo?: Recipient[];
        sender?: Recipient;
        sentDateTime?: string;
        subject?: string;
        toRecipients?: Recipient[];
        webLink?: string;
    }
    interface Attendee {
        status?: ResponseStatus;
        type?: string;
        emailAddress?: EmailAddress;
    }
    interface DateTimeTimeZone {
        dateTime?: string;
        timeZone?: string;
    }
    interface PatternedRecurrence {
    }
    interface ResponseStatus {
        response?: string;
        time?: string;
    }
    interface Location {
        displayName?: string;
        address?: any;
    }
    interface EventDataModel {
        attendees?: Attendee[];
        body?: ItemBody;
        bodyPreview?: string;
        categories?: string[];
        changeKey?: string;
        createdDateTime?: string;
        end?: DateTimeTimeZone;
        hasAttachments?: boolean;
        iCalUId?: string;
        id?: string;
        IDBCursor?: string;
        importance?: string;
        isAllDay?: boolean;
        isCancelled?: boolean;
        isOrganizer?: boolean;
        isReminderOn?: boolean;
        lastModifiedDateTime?: string;
        location?: Location;
        organizer?: Recipient;
        originalEndTimeZone?: string;
        originalStartTimeZone?: string;
        recurrence?: PatternedRecurrence;
        reminderMinutesBeforeStart?: number;
        responseRequested?: boolean;
        responseStatus?: ResponseStatus;
        sensitivity?: string;
        seriesMasterId?: string;
        showAs?: string;
        start?: DateTimeTimeZone;
        subject?: string;
        type?: string;
        webLink?: string;
    }
    interface GroupDataModel {
        id?: string;
        description?: string;
        displayName?: string;
        groupTypes?: string[];
        mail?: string;
        mailEnabled?: Boolean;
        mailNickname?: string;
        onPremisesLastSyncDateTime?: Date;
        onPremisesSecurityIdentifier?: string;
        onPremisesSyncEnabled?: Boolean;
        proxyAddresses?: string[];
        securityEnabled?: Boolean;
        visibility?: string;
    }
    interface MailFolderDataModel {
        id?: string;
        displayName?: string;
        childFolderCount?: number;
        unreadItemCount?: number;
        totalItemCount?: number;
    }
    interface AttachmentDataModel {
        contentId?: string;
        id?: string;
        isInline?: boolean;
        lastModifiedDateTime?: Date;
        name?: string;
        size?: number;
        contentBytes?: string;
        contentLocation?: string;
        contentType?: string;
    }
}
declare namespace Kurve {
    class Scopes {
        private static rootUrl;
        static General: {
            OpenId: string;
            OfflineAccess: string;
        };
        static User: {
            Read: string;
            ReadAll: string;
            ReadWrite: string;
            ReadWriteAll: string;
            ReadBasicAll: string;
        };
        static Contacts: {
            Read: string;
            ReadWrite: string;
        };
        static Directory: {
            ReadAll: string;
            ReadWriteAll: string;
            AccessAsUserAll: string;
        };
        static Group: {
            ReadAll: string;
            ReadWriteAll: string;
            AccessAsUserAll: string;
        };
        static Mail: {
            Read: string;
            ReadWrite: string;
            Send: string;
        };
        static Calendars: {
            Read: string;
            ReadWrite: string;
        };
        static Files: {
            Read: string;
            ReadAll: string;
            ReadWrite: string;
            ReadWriteAppFolder: string;
            ReadWriteSelected: string;
        };
        static Tasks: {
            ReadWrite: string;
        };
        static People: {
            Read: string;
            ReadWrite: string;
        };
        static Notes: {
            Create: string;
            ReadWriteCreatedByApp: string;
            Read: string;
            ReadAll: string;
            ReadWriteAll: string;
        };
    }
    class OData {
        query: string;
        constructor(query?: string);
        toString: () => string;
        odata: (query: string) => this;
        select: (...fields: string[]) => this;
        expand: (...fields: string[]) => this;
        filter: (query: string) => this;
        orderby: (...fields: string[]) => this;
        top: (items: Number) => this;
        skip: (items: Number) => this;
    }
    type GraphObject<Model, N extends Node> = Model & {
        _context: N;
    };
    interface Context<N extends Node> {
        (id: string): N;
    }
    abstract class Node {
        protected graph: Graph;
        protected path: string;
        constructor(graph: Graph, path?: string);
        protected scopesForV2: (scopes: string[]) => string[];
        pathWithQuery: (odataQuery?: OData | string, pathSuffix?: string) => string;
        protected graphObjectFromResponse: <Model, N extends Node>(response: any, node: N, context?: Context<N>) => Model & {
            _context: N;
        };
        protected get<Model, N extends Node>(path: string, node: N, scopes?: string[], context?: Context<N>, responseType?: string): Promise<GraphObject<Model, N>, Error>;
        protected post<Model, N extends Node>(object: Model, path: string, node: N, scopes?: string[]): Promise<GraphObject<Model, N>, Error>;
    }
    interface GraphCollection<Model, C extends CollectionNode, N extends Node> {
        value: Array<GraphObject<Model, N>>;
        _context: C;
        _next?: () => Promise<GraphCollection<Model, C, N>, Error>;
    }
    abstract class CollectionNode extends Node {
        protected graphCollectionFromResponse: <Model, C extends CollectionNode, N extends Node>(response: any, node: C, context?: Context<N>, scopes?: string[]) => GraphCollection<Model, C, N>;
        protected getCollection<Model, C extends CollectionNode, N extends Node>(path: string, node: C, context: Context<N>, scopes?: string[]): Promise<GraphCollection<Model, C, N>, Error>;
    }
    class Attachment extends Node {
        private context;
        constructor(graph: Graph, path: string, context: string, attachmentId?: string);
        static scopes: {
            messages: string[];
            events: string[];
        };
        GetAttachment: (odataQuery?: OData | string) => Promise<AttachmentDataModel & {
            _context: Attachment;
        }, Error>;
    }
    class Attachments extends CollectionNode {
        private context;
        constructor(graph: Graph, path: string, context: string);
        $: (attachmentId: string) => Attachment;
        GetAttachments: (odataQuery?: OData | string) => Promise<GraphCollection<AttachmentDataModel, Attachments, Attachment>, Error>;
    }
    class Message extends Node {
        constructor(graph: Graph, path?: string, messageId?: string);
        attachments: Attachments;
        GetMessage: (odataQuery?: OData | string) => Promise<MessageDataModel & {
            _context: Message;
        }, Error>;
        SendMessage: (odataQuery?: OData | string) => Promise<MessageDataModel & {
            _context: Message;
        }, Error>;
    }
    class Messages extends CollectionNode {
        constructor(graph: Graph, path?: string);
        $: (messageId: string) => Message;
        GetMessages: (odataQuery?: OData | string) => Promise<GraphCollection<MessageDataModel, Messages, Message>, Error>;
        CreateMessage: (object: MessageDataModel, odataQuery?: OData | string) => Promise<MessageDataModel & {
            _context: Messages;
        }, Error>;
    }
    class Event extends Node {
        constructor(graph: Graph, path: string, eventId: string);
        attachments: Attachments;
        GetEvent: (odataQuery?: OData | string) => Promise<EventDataModel & {
            _context: Event;
        }, Error>;
    }
    class Events extends CollectionNode {
        constructor(graph: Graph, path?: string);
        $: (eventId: string) => Event;
        GetEvents: (odataQuery?: OData | string) => Promise<GraphCollection<EventDataModel, Events, Event>, Error>;
    }
    class CalendarView extends CollectionNode {
        constructor(graph: Graph, path?: string);
        private $;
        static dateRange: (startDate: Date, endDate: Date) => string;
        GetEvents: (odataQuery?: OData | string) => Promise<GraphCollection<EventDataModel, CalendarView, Event>, Error>;
    }
    class MailFolder extends Node {
        constructor(graph: Graph, path: string, mailFolderId: string);
        GetMailFolder: (odataQuery?: OData | string) => Promise<MailFolderDataModel & {
            _context: MailFolder;
        }, Error>;
    }
    class MailFolders extends CollectionNode {
        constructor(graph: Graph, path?: string);
        $: (mailFolderId: string) => MailFolder;
        GetMailFolders: (odataQuery?: OData | string) => Promise<GraphCollection<MailFolderDataModel, MailFolders, MailFolder>, Error>;
    }
    class Photo extends Node {
        private context;
        constructor(graph: Graph, path: string, context: string);
        static scopes: {
            user: string[];
            group: string[];
            contact: string[];
        };
        GetPhotoProperties: (odataQuery?: OData | string) => Promise<ProfilePhotoDataModel & {
            _context: Photo;
        }, Error>;
        GetPhotoImage: (odataQuery?: OData | string) => Promise<any, Error>;
    }
    class Manager extends Node {
        constructor(graph: Graph, path?: string);
        GetUser: (odataQuery?: OData | string) => Promise<UserDataModel & {
            _context: User;
        }, Error>;
    }
    class MemberOf extends CollectionNode {
        constructor(graph: Graph, path?: string);
        GetGroups: (odataQuery?: OData | string) => Promise<GraphCollection<GroupDataModel, MemberOf, Group>, Error>;
    }
    class DirectReport extends Node {
        protected graph: Graph;
        constructor(graph: Graph, path?: string, userId?: string);
        GetUser: (odataQuery?: OData | string) => Promise<UserDataModel & {
            _context: User;
        }, Error>;
    }
    class DirectReports extends CollectionNode {
        constructor(graph: Graph, path?: string);
        $: (userId: string) => DirectReport;
        GetUsers: (odataQuery?: OData | string) => Promise<GraphCollection<UserDataModel, DirectReports, User>, Error>;
    }
    class User extends Node {
        protected graph: Graph;
        constructor(graph: Graph, path?: string, userId?: string);
        messages: Messages;
        events: Events;
        calendarView: CalendarView;
        mailFolders: MailFolders;
        photo: Photo;
        manager: Manager;
        directReports: DirectReports;
        memberOf: MemberOf;
        GetUser: (odataQuery?: OData | string) => Promise<UserDataModel & {
            _context: User;
        }, Error>;
    }
    class Users extends CollectionNode {
        constructor(graph: Graph, path?: string);
        $: (userId: string) => User;
        GetUsers: (odataQuery?: OData | string) => Promise<GraphCollection<UserDataModel, Users, User>, Error>;
    }
    class Group extends Node {
        protected graph: Graph;
        constructor(graph: Graph, path: string, groupId: string);
        GetGroup: (odataQuery?: OData | string) => Promise<GroupDataModel & {
            _context: Group;
        }, Error>;
    }
    class Groups extends CollectionNode {
        constructor(graph: Graph, path?: string);
        $: (groupId: string) => Group;
        GetGroups: (odataQuery?: OData | string) => Promise<GraphCollection<GroupDataModel, Groups, Group>, Error>;
    }
}

export = Kurve;
