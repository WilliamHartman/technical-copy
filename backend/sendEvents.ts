import { messages } from './database/data/shipments'
import axios from 'axios'

async function main() {
    for (let i = 0; i < messages.length; i++) {
        const message = messages[i]

        try {
            await axios.post('http://localhost:3001/shipments', message)
            console.log(`Message ${i + 1} sent`)
        } catch (error) {
            console.error(error)
        }

    }
}

main().catch(
    console.error
)
