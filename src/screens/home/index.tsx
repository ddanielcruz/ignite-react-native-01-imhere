import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

import { Participant } from '../../components/participant'
import { styles } from './styles'
import { useState } from 'react'

interface Participant {
  id: number
  name: string
}

export function HomeScreen() {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [participantName, setParticipantName] = useState('')

  function handleAddParticipant() {
    const name = participantName.trim()
    if (!name) {
      return
    }

    if (participants.some((participant) => participant.name === name)) {
      return Alert.alert(
        'Participante já adicionado',
        'Esse participante já está na lista.',
      )
    }

    setParticipants((prevParticipants) => [
      ...prevParticipants,
      { id: Date.now(), name },
    ])
    setParticipantName('')
  }

  function handleRemoveParticipant(id: number) {
    console.log('removing participant with id', id)
    Alert.alert('Remover participante', 'Deseja remover esse participante?', [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Sim',
        onPress: () => {
          setParticipants((prevParticipants) =>
            prevParticipants.filter((participant) => participant.id !== id),
          )
        },
      },
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventTitle}>Campus Party 2024</Text>
      <Text style={styles.eventDate}>Sexta, 7 de Junho de 2024.</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          value={participantName}
          onChangeText={setParticipantName}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddParticipant}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(participant) => participant.id.toString()}
        renderItem={({ item: participant }) => (
          <Participant
            name={participant.name}
            onRemove={() => handleRemoveParticipant(participant.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Adicione participantes na sua lista de presença.
          </Text>
        )}
      />
    </View>
  )
}
