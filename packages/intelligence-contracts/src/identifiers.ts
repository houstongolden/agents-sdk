import { z } from "zod";
import {
  ADIL_URN_PATTERN,
  AdilUrnSchema,
  IdentifierSchema,
  JsonPointerSchema,
  OpaqueIdSchema,
  UrnSegmentSchema,
  type AdilUrn,
} from "./common.js";

export const AdilUrnPartsSchema = z
  .object({
    issuerId: UrnSegmentSchema,
    environment: UrnSegmentSchema,
    app: UrnSegmentSchema,
    resourceType: IdentifierSchema,
    opaqueId: OpaqueIdSchema,
  })
  .strict();

export type AdilUrnParts = z.infer<typeof AdilUrnPartsSchema>;

export function formatAdilUrn(input: AdilUrnParts): AdilUrn {
  const parts = AdilUrnPartsSchema.parse(input);
  return AdilUrnSchema.parse(
    `urn:agents-sdk:${parts.issuerId}:${parts.environment}:${parts.app}:${parts.resourceType}:${parts.opaqueId}`,
  );
}

export function parseAdilUrn(value: string): AdilUrnParts {
  const urn = AdilUrnSchema.parse(value);
  const match = ADIL_URN_PATTERN.exec(urn);
  if (!match) throw new Error("Invalid ADIL URN");
  return AdilUrnPartsSchema.parse({
    issuerId: match[1],
    environment: match[2],
    app: match[3],
    resourceType: match[4],
    opaqueId: match[5],
  });
}

const RangeSchema = z
  .object({ start: z.number().int().nonnegative(), end: z.number().int().positive() })
  .strict()
  .refine(({ start, end }) => end > start, "end must be greater than start");

export const FragmentLocatorSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("row_field") }).strict(),
  z.object({ kind: z.literal("json_pointer"), pointer: JsonPointerSchema }).strict(),
  RangeSchema.extend({ kind: z.literal("text_span") }).strict(),
  z
    .object({
      kind: z.literal("image_region"),
      x: z.number().min(0).max(1),
      y: z.number().min(0).max(1),
      widthWithinRemainder: z.number().positive().max(1),
      heightWithinRemainder: z.number().positive().max(1),
    })
    .strict(),
  z
    .object({
      kind: z.literal("page"),
      page: z.number().int().positive(),
      endPage: z.number().int().positive().optional(),
    })
    .strict()
    .refine(
      ({ page, endPage }) => endPage === undefined || endPage >= page,
      "endPage must be after page",
    ),
  z
    .object({ kind: z.literal("document_heading"), headingPath: z.array(z.string().min(1)).min(1) })
    .strict(),
  z
    .object({
      kind: z.literal("transcript_timecode"),
      startMs: z.number().int().nonnegative(),
      endMs: z.number().int().positive(),
      speaker: z.string().min(1).optional(),
    })
    .strict()
    .refine(({ startMs, endMs }) => endMs > startMs, "endMs must be greater than startMs"),
  z
    .object({
      kind: z.literal("speaker_turn"),
      turn: z.number().int().nonnegative(),
      speaker: z.string().min(1).optional(),
    })
    .strict(),
  z
    .object({
      kind: z.literal("video_frame_range"),
      startMs: z.number().int().nonnegative(),
      endMs: z.number().int().positive(),
    })
    .strict()
    .refine(({ startMs, endMs }) => endMs > startMs, "endMs must be greater than startMs"),
]);

export type FragmentLocator = z.infer<typeof FragmentLocatorSchema>;

export function parseFragmentLocator(value: unknown): FragmentLocator {
  const decoded = typeof value === "string" ? (JSON.parse(value) as unknown) : value;
  return FragmentLocatorSchema.parse(decoded);
}

export function formatFragmentLocator(value: FragmentLocator): string {
  const locator = FragmentLocatorSchema.parse(value);
  const ordered = Object.fromEntries(
    Object.entries(locator).sort(([a], [b]) => a.localeCompare(b)),
  );
  return JSON.stringify(ordered);
}
