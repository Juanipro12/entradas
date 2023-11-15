import Entrada from "../models/entrada.js";
import qrCode from "qrcode";
import Evento from "../models/evento.js";

const generarQR = async (req, res) => {
  try {
    const { eventoId } = req.body;

    if (req.usuario.role !== "normal") {
      return res.status(403).json({
        error: "Acceso no autorizado. Se requiere un usuario normal.",
      });
    }

    const qrData = `Entrada para el Evento: ${eventoId}`;
    const qrCodeBuffer = await qrCode.toBuffer(qrData);

    const qrCodeBase64 = qrCodeBuffer.toString("base64");

    const nuevaEntrada = await Entrada.create({
      qr: qrCodeBase64,
      EventoId: eventoId,
      usuarioId: req.usuario.id,
    });
    const evento = await Evento.findOne({
      where: { id: eventoId },
      attributes: ['estado', 'nombre'],
    });

    res.status(201).json({ ...nuevaEntrada.toJSON(), Evento: evento });
  } catch (error) {
    console.error("Error al generar el QR para la entrada:", error);
    res
      .status(500)
      .json({ error: "Error al generar el QR para la entrada", ...error });
  }
};

const usarEntrada = async (req, res) => {
  try {
    const { qrCode } = req.body;

    if (req.usuario.role !== "admin") {
      return res.status(403).json({
        error: "Acceso no autorizado. Se requiere un usuario administrador.",
      });
    }

    const entrada = await Entrada.findOne({
      where: {
        qr: qrCode,
        usada: false,
      },
    });
    if (!entrada) {
      return res
        .status(404)
        .json({ error: "Entrada no encontrada o ya usada" });
    }

    await entrada.update({ usada: true });

    res.status(200).json({ mensaje: "Entrada usada con éxito" });
  } catch (error) {
    console.error("Error al usar la entrada:", error);
    res.status(500).json({ error: "Error al usar la entrada", ...error });
  }
};

const getEntradas = async (req, res) => {
  try {
    const esAdmin = req.usuario.role === "admin";

    const entradas = esAdmin
      ? await Entrada.findAll({
          include: [
            {
              model: Evento,
              attributes: ["nombre", "estado"],
            },
          ],
        })
      : await Entrada.findAll({
          where: { usuarioId: req.usuario.id },
          include: [
            {
              model: Evento,
              attributes: ["nombre", "estado"],
            },
          ],
        });

    res.status(200).json(entradas);
  } catch (error) {
    console.error("Error al obtener entradas:", error);
    res.status(500).json({ error: "Error al obtener entradas" });
  }
};

export { generarQR, usarEntrada, getEntradas };
