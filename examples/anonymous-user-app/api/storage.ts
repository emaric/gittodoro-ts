import Duration from '@/interactor/entities/Duration'
import Session from '@/interactor/entities/Session'

const storage: {
  duration: Duration[]
  session: Session[]
} = {
  duration: [],
  session: [],
}

export default storage
