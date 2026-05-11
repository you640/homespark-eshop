import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";

export default function OrderCancel() {
  return (
    <Layout hideMobileCart>
      <div className="section-container py-16 md:py-24 text-center max-w-md mx-auto">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
          <XCircle className="h-12 w-12 text-destructive" />
        </div>
        <h1 className="text-3xl font-display font-bold mb-4">Platba zrušená</h1>
        <p className="text-muted-foreground mb-8">
          Platba nebola dokončená. Vaša objednávka zostala v košíku.
        </p>
        <div className="flex gap-3 justify-center">
          <Button asChild variant="outline"><Link to="/">Domov</Link></Button>
          <Button asChild><Link to="/kosik">Späť do košíka</Link></Button>
        </div>
      </div>
    </Layout>
  );
}
