import { SecurityFile } from "@/api";
import { ParticipantInfo } from "@/components/raid/custom/ParticipantInfo";
import { TextSeparator } from "@/components/raid/custom/TextSeparator";

interface SecurityFileDialogViewProps {
  file: SecurityFile;
}

export const SecurityFileDialogView = ({
  file,
}: SecurityFileDialogViewProps) => {
  function getAsthma() {
    return (
      <>
        <ParticipantInfo label="Asthme" value={file.asthma} />
        {file.asthma && (
          <>
            <ParticipantInfo
              label="Passage en soins intensifs"
              value={file.intensive_care_unit}
            />
            {file.intensive_care_unit && (
              <>
                <ParticipantInfo
                  label="Date de passage en soins intensifs"
                  value={file.intensive_care_unit_when}
                />
              </>
            )}
          </>
        )}
      </>
    );
  }

  return (
    <div className="flex flex-col justify-between h-full w-full">
      <ParticipantInfo label="Allergies" value={file.allergy} />
      {getAsthma()}
      <ParticipantInfo
        label="Traitement en cours"
        value={file.ongoing_treatment}
      />
      <ParticipantInfo label="Maladies" value={file.sicknesses} />
      <ParticipantInfo label="Hospitalisation" value={file.hospitalization} />
      <ParticipantInfo
        label="Opération chirurgicale"
        value={file.surgical_operation}
      />
      <ParticipantInfo label="Traumatisme" value={file.trauma} />
      <ParticipantInfo label="Antécédents familiaux" value={file.family} />

      <div className="my-4 items-center">
        <TextSeparator text="Personne à contacter en cas d'urgence" />
      </div>
      <ParticipantInfo label="Prénom" value={file.emergency_person_firstname} />
      <ParticipantInfo label="Nom" value={file.emergency_person_name} />
      <ParticipantInfo
        label="Téléphone"
        value={file.emergency_person_phone}
        isPhone
      />
    </div>
  );
};
