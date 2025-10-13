import React from 'react'
import styles from './EditEntry.module.css'
import Input from '../../components/ui/Input/Input'
import Button from '../../components/ui/Button/Button'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
import { Entry, PatientProfileLoaderData } from 'services/types'

interface EntryFormProps {
    initialData?: Entry;
    onSuccess?: () => void;
  }

export default function EditEntry({initialData, onSuccess}: EntryFormProps) {;
    const navigate = useNavigate()
    const entryId = useParams<{entryId: string}>();
    const { entries } = useLoaderData() as PatientProfileLoaderData;
    const entry = entries.find(entry => entry.entry_id === Number(entryId.entryId)) 

    const [mainSymptoms, setMainSymptoms] = React.useState(entry?.main_symptoms || '');
    const [conditionDescription, setConditionDescription] = React.useState(entry?.condition_description || '');
    const [labsAsked, setLabsAsked] = React.useState(entry?.labs_asked || '');
    const [diagnosis, setDiagnosis] = React.useState(entry?.diagnosis || '');
    const [treatment, setTreatment] = React.useState(entry?.treatment || '');
    const [notes, setNotes] = React.useState(entry?.notes || '');
    
  
    const handleSubmit = async () => {
        try {
          if (initialData) {
            await updateEntry({
              ...initialData,
              main_symptoms: mainSymptoms,
              condition_description: conditionDescription,
              labs_asked: labsAsked,
              diagnosis,
              treatment,
              notes,
            });
          } else {
            await postEntries({
              patient_id: initialData?.patient_id ?? 0, // or pass from props
              main_symptoms: mainSymptoms,
              condition_description: conditionDescription,
              labs_asked: labsAsked,
              diagnosis,
              treatment,
              notes,
            });
          }
    
          onSuccess?.();
        } catch (err: any) {
          setError('Error saving entry.');
          console.error(err);
        }
      };

    return (
        <div className={styles.mainContainer}>
                <Button
                    onClick={() => navigate(-1)}
                    className={styles.backButton}
                >
                    Back
                </Button>
            <div className={styles.formContainer}>
                <div className={styles.modalDiv}>
                    <h3>Main symptoms</h3>
                    <Input
                        placeholder='i.e: Headache, fever'
                        onChange={(e) => setMainSymptoms(e.target.value)}
                        value={mainSymptoms}
                        className={styles.input}
                    />
                </div>
                <div className={styles.modalDiv}>
                    <h3>Description</h3>
                    <Input
                        placeholder='i.e: Patient has been experiencing...'
                        onChange={(e) => setConditionDescription(e.target.value)}
                        value={conditionDescription}
                        className={styles.input}
                    />
                </div>
                <div className={styles.modalDiv}>
                    <h3>Diagnosis</h3>
                    <Input
                        placeholder='i.e: Flu'
                        onChange={(e) => setDiagnosis(e.target.value)}
                        value={diagnosis}
                        className={styles.input}
                    />
                </div>
                <div className={styles.modalDiv}>
                    <h3>Labs asked</h3>
                    <Input
                        placeholder='i.e: Blood test'
                        onChange={(e) => setLabsAsked(e.target.value)}
                        value={labsAsked}
                        className={styles.input}
                    />
                </div>
                <div className={styles.modalDiv}>
                    <h3>Treatment</h3>
                    <Input
                        placeholder='i.e: Ibuprofen 400mg'
                        onChange={(e) => setTreatment(e.target.value)}
                        value={treatment}
                        className={styles.input}
                    />
                </div>
                <div className={styles.modalDiv}>
                    <h3>Notes</h3>
                    <Input
                        placeholder=''
                        onChange={(e) => setNotes(e.target.value)}
                        value={notes}
                        className={styles.input}
                    />
                </div>
            </div>
                <Button
                onClick={()=> console.log("button clicked")}
                >
                    Submit
                </Button>
        </div>
    )
}