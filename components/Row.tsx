import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Checkbox } from 'react-native-paper'
import { Task } from '../types/Task'

interface TodoRowProps {
    item: Task
    onDelete: (id: number) => void
    onToggle: (id: number) => void
}

export default function Row({ item, onDelete, onToggle }: TodoRowProps) {
    return (
        <View style={styles.todoRow}>
            <Checkbox
                status={item.completed === 1 ? 'checked' : 'unchecked'}
                color="#105b3c"
                uncheckedColor='#363636'
                onPress={() => {
                    console.log('Checkbox tapped:', item.id)
                    onToggle(item.id)
                }}
            />
            <Text style={styles.todoText}>{item.text}</Text>
            <Pressable style={styles.button} onPress={() => onDelete(item.id)}>
                <Text style={styles.deleteIcon}>❌</Text>
            </Pressable>
            {item.completed === 1 && (
                <View pointerEvents="none" style={styles.strikethrough} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    todoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e3ece6',
        borderRadius: 8,
        padding: 4,
        marginVertical: 6,
        marginHorizontal: 10,
        shadowColor: '#105b3c',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        position: 'relative',
    },
    strikethrough: {
        position: 'absolute',
        left: 13,
        right: 48,
        top: '60%',
        height: 1.5,
        backgroundColor: '#363636',
    },
    todoText: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
        color: '#363636'
    },
    button: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteIcon: {
        fontSize: 16,
    },
});
