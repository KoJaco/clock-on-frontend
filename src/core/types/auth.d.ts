type UniqueIdentifier = string | number;

export interface FormErrorRecords {
    [key: UniqueIdentifier]: { errors: Error[] | null };
}
