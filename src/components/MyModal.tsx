import Rodal from 'rodal'
import Select from 'react-select'
import { toast } from 'react-toastify'
import { useState, useContext, FormEvent } from 'react'
// files
import UserContext from 'contexts/UserContext'
import { db } from 'configs/firebaseConfig'

export interface MyModalProps {
  isOpen: boolean
  closeModal: () => void
  roompyId: string
}

const types = [
  {
    value: 1,
    label: 'Suspected scammer',
  },
  {
    value: 2,
    label: 'Contains incorrect information',
  },
  {
    value: 3,
    label: 'Bug or problem with the website',
  },
  {
    value: 4,
    label: 'Spam or commercial unrelated to roompy',
  },
  {
    value: 5,
    label: 'Contains offensive or inappropriate content',
  },
]

export default function MyModal({
  isOpen,
  closeModal,
  roompyId,
}: MyModalProps): JSX.Element {
  // hooks
  const { user } = useContext(UserContext)
  const [reportMessage, setReportMessage] = useState<string>('')
  const [selectedTypes, setSelectedTypes] = useState(null) // object

  async function submitReport(e: FormEvent<HTMLFormElement>): Promise<void> {
    try {
      e.preventDefault()

      // check input
      if (!reportMessage || !selectedTypes.value) {
        toast.warning('Please fill in all the report field')
        return
      }

      const report = {
        from: user.uid,
        for: roompyId,
        typeId: selectedTypes.value,
        desc: reportMessage,
      }

      // store to firestore
      await db.collection('reports').add(report)

      // after all done
      closeModal()
      toast.success(
        'Thanks for your report, we will review this roompies shortly'
      )
    } catch (err) {
      console.error(err)
      toast.error(err.message)
    }
  }

  return (
    <Rodal
      animation="flip"
      closeOnEsc
      height={400}
      width={600}
      visible={isOpen}
      onClose={closeModal}
    >
      <section className="flex flex-col w-full h-full px-5 py-2">
        <p className="mb-4 text-2xl font-bold text-center text-purple-700">
          Report this roompies
        </p>

        <form onSubmit={(e) => submitReport(e)}>
          <label htmlFor="tipeLaporan">
            <Select
              className="w-full my-4"
              name="tipeLaporan"
              id="tipeLaporan"
              placeholder="Reasons for report..."
              required
              options={types}
              onChange={(type) => setSelectedTypes(type)}
            />
          </label>

          <label htmlFor="laporan">
            <textarea
              className="w-full p-3 my-2 bg-white border rounded-md outline-none appearance-none hover:border-purple-700 focus:border-purple-700"
              name="laporan"
              id="laporan"
              placeholder="Describe the issue here..."
              required
              rows={5}
              onChange={(e) => setReportMessage(e.target.value)}
              value={reportMessage}
            />
          </label>

          <button
            className="flex items-center justify-center w-full px-2 py-3 mt-4 text-sm font-bold tracking-wider text-purple-700 uppercase bg-purple-100 rounded-md text-FaShower focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 hover:text-white hover:bg-purple-700"
            type="submit"
          >
            Submit Report
          </button>
        </form>
      </section>
    </Rodal>
  )
}
