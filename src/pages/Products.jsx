import React, { useState } from "react";
import { getLabeling } from "../services/openFDA";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Grid2,
  Card,
  CardContent,
  Box,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(Boolean);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getLabeling(query, 10, (page - 1) * 10);
      setResults(data || []);
    } catch (err) {
      setError("No se pudieron cargar los datos.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    handleSearch();
  };

  return (
    <div className="p-5 flex flex-col">
      <div className="flex flex-row justify-between">
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <SearchIcon
            sx={{ color: "action.active", mr: 1, my: 0.5 }}
            onClick={handleSearch}
            disabled={loading}
            className="cursor-pointer"
          />
          <TextField
            id="input-with-sx"
            label="Search drugs"
            variant="standard"
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            margin="normal"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </Box>
      </div>
      {loading && <CircularProgress size={24} className="mt-4" />}
      {error && (
        <Typography color="error" className="mt-4">
          {error}
        </Typography>
      )}

      <Grid2 container spacing={2} className="mt-4">
        {results.map((item, index) => (
          <Grid2 item xs={12} sm={6} md={4} key={index}>
            <Card
              onClick={() =>
                navigate(`/product/${item.openfda?.product_ndc[0]}`)
              }
              className="cursor-pointer"
              variant="outlined"
            >
              <CardContent>
                <Typography variant="h6">{item.openfda.brand_name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.openfda.manufacturer_name}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {results.length > 0 && (
        <div className="mt-4 flex justify-center">
          {/* <Button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="mx-2"
          >
            Anterior
          </Button>
          <Button onClick={() => handlePageChange(page + 1)} className="mx-2">
            Siguiente
          </Button> */}
          <Pagination count={10} />
        </div>
      )}
    </div>
  );
}
