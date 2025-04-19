
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

export default function Subscriptions() {
  const plans = [
    {
      name: "Basic",
      price: "29€",
      description: "Pour les petits propriétaires",
      features: [
        "Jusqu'à 5 locataires",
        "Gestion des paiements",
        "Règlement intérieur",
        "Support email"
      ]
    },
    {
      name: "Pro",
      price: "79€",
      description: "Pour les propriétaires professionnels",
      features: [
        "Jusqu'à 20 locataires",
        "Gestion des paiements",
        "Règlement intérieur",
        "Support prioritaire",
        "Statistiques avancées",
        "Export des données"
      ]
    },
    {
      name: "Enterprise",
      price: "199€",
      description: "Pour les grandes structures",
      features: [
        "Locataires illimités",
        "Gestion des paiements",
        "Règlement intérieur",
        "Support dédié 24/7",
        "Statistiques avancées",
        "Export des données",
        "API personnalisée",
        "Formations incluses"
      ]
    }
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-white mb-6">Gérer votre abonnement</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name} className="relative hover:border-[#7FD1C7] transition-all duration-200">
            <CardHeader>
              <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
              <CardDescription className="text-sm">{plan.description}</CardDescription>
              <div className="text-3xl font-bold mt-2">{plan.price}<span className="text-sm font-normal">/mois</span></div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-[#7FD1C7] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full mt-6 bg-[#7FD1C7] hover:bg-[#6BC0B6] text-[#1A2533]"
              >
                Sélectionner {plan.name}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
