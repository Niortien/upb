import { PageMessage } from "@/components/common/page-message";

export default function NotFound() {
  return (
    <PageMessage
      repere="404"
      titre="Cette page n'existe pas."
      texte="La page que vous cherchez a peut-être été déplacée ou supprimée. Revenez à l'accueil ou explorez nos formations."
      actions={[
        { label: "Retour à l'accueil", href: "/" },
        { label: "Nos formations", href: "/formation" },
      ]}
    />
  );
}
