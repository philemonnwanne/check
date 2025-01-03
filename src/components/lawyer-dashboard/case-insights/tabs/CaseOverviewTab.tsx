import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CaseOverview } from "@/components/cases/sections/CaseOverview"
import { LegalRepresentatives } from "@/components/cases/sections/LegalRepresentatives"
import { CaseLocation } from "@/components/cases/sections/CaseLocation"
import { SettlementOffers } from "@/components/cases/sections/SettlementOffers"
import { PendingItems } from "@/components/cases/sections/PendingItems"

interface CaseOverviewTabProps {
  isEditing: boolean
  caseData: any // Using the same type as client dashboard
  onSave: () => void
}

export function CaseOverviewTab({ isEditing, caseData, onSave }: CaseOverviewTabProps) {
  const [formData, setFormData] = useState(caseData)

  return (
    <>
      <h2 className="text-2xl font-bold">{formData.title}</h2>
      <div className="flex items-center gap-2 mt-2">
        <Badge variant="secondary">{formData.type}</Badge>
        <Badge variant="outline">{formData.status}</Badge>
      </div>

      <PendingItems />

      <Separator />

      <CaseOverview 
        estimatedDuration={formData.estimatedDuration}
        subject={formData.description}
        intakeFormId={formData.intakeFormId}
      />

      <LegalRepresentatives 
        lawyer={formData.lawyer}
        judge={formData.judge}
      />

      <CaseLocation location={formData.location} />

      <SettlementOffers offers={formData.settlementOffers || []} />

      {isEditing && (
        <Button onClick={onSave} className="w-full">
          Save Changes
        </Button>
      )}
    </>
  )
}