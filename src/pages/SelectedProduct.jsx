import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDrugDetails } from "../services/openFDA";
import { Typography, CircularProgress, Card, CardContent } from "@mui/material";

const DetailsPage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getDrugDetails(id);
        setDetails(data);
      } catch (err) {
        setError("No se pudieron cargar los detalles.");
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [id]);

  if (loading) return <CircularProgress size={50} className="mt-4" />;
  if (error)
    return (
      <Typography color="error" className="mt-4">
        {error}
      </Typography>
    );

  return (
    <div className="p-5">
      <Typography variant="h4" gutterBottom>
        {details?.openfda?.brand_name || "Sin nombre"}
      </Typography>
      <Typography variant="body1" className="mb-4">
        {details?.description || "Descripción no disponible"}
      </Typography>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6">Principios Activos</Typography>
          {details?.active_ingredients?.map((ingredient, index) => (
            <Typography key={index}>
              {ingredient.ingredient_name} ({ingredient.strength})
            </Typography>
          ))}
        </CardContent>
      </Card>

      <Card variant="outlined" className="mt-4">
        <CardContent>
          <Typography variant="h6">Ruta de Administración</Typography>
          <Typography>{details?.route || "No disponible"}</Typography>
        </CardContent>
      </Card>

      <Card variant="outlined" className="mt-4">
        <CardContent>
          <Typography variant="h6">Presentación</Typography>
          <Typography>{details?.dosage_form || "No disponible"}</Typography>
        </CardContent>
      </Card>

      <Card variant="outlined" className="mt-4">
        <CardContent>
          <Typography variant="h6">Empaque</Typography>
          {details?.packaging?.map((pack, index) => (
            <Typography key={index}>
              {pack?.description || "Descripción no disponible"}
            </Typography>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailsPage;
