"use client";
import { useRef } from "react";
import {
    useBoolean,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    Button,
} from "@chakra-ui/react";

const ItemDeleteModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onDelete: (() => Promise<void>) | (() => void);
}> = ({
    isOpen,
    onClose,
    onDelete
}) => {

        const cancelRef = useRef<HTMLButtonElement | null>(null);
        const [isLoading, setLoading] = useBoolean(false);

        const handleDelete = async() => {
            setLoading.on();
            await onDelete();
            onClose();
            setLoading.off();
        }

        return (
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Item
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme='red'
                                onClick={handleDelete}
                                ml={3}
                                isLoading={isLoading}
                                loadingText="Deleting..."
                            >
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        );
    };

export default ItemDeleteModal;