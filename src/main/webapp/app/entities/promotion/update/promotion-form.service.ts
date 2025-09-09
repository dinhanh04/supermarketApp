import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IPromotion, NewPromotion } from '../promotion.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IPromotion for edit and NewPromotionFormGroupInput for create.
 */
type PromotionFormGroupInput = IPromotion | PartialWithRequiredKeyOf<NewPromotion>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IPromotion | NewPromotion> = Omit<T, 'startAt' | 'endAt'> & {
  startAt?: string | null;
  endAt?: string | null;
};

type PromotionFormRawValue = FormValueOf<IPromotion>;

type NewPromotionFormRawValue = FormValueOf<NewPromotion>;

type PromotionFormDefaults = Pick<NewPromotion, 'id' | 'startAt' | 'endAt' | 'active' | 'products'>;

type PromotionFormGroupContent = {
  id: FormControl<PromotionFormRawValue['id'] | NewPromotion['id']>;
  name: FormControl<PromotionFormRawValue['name']>;
  type: FormControl<PromotionFormRawValue['type']>;
  value: FormControl<PromotionFormRawValue['value']>;
  startAt: FormControl<PromotionFormRawValue['startAt']>;
  endAt: FormControl<PromotionFormRawValue['endAt']>;
  active: FormControl<PromotionFormRawValue['active']>;
  products: FormControl<PromotionFormRawValue['products']>;
};

export type PromotionFormGroup = FormGroup<PromotionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class PromotionFormService {
  createPromotionFormGroup(promotion: PromotionFormGroupInput = { id: null }): PromotionFormGroup {
    const promotionRawValue = this.convertPromotionToPromotionRawValue({
      ...this.getFormDefaults(),
      ...promotion,
    });
    return new FormGroup<PromotionFormGroupContent>({
      id: new FormControl(
        { value: promotionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      name: new FormControl(promotionRawValue.name, {
        validators: [Validators.required],
      }),
      type: new FormControl(promotionRawValue.type, {
        validators: [Validators.required],
      }),
      value: new FormControl(promotionRawValue.value, {
        validators: [Validators.required, Validators.min(0)],
      }),
      startAt: new FormControl(promotionRawValue.startAt, {
        validators: [Validators.required],
      }),
      endAt: new FormControl(promotionRawValue.endAt, {
        validators: [Validators.required],
      }),
      active: new FormControl(promotionRawValue.active, {
        validators: [Validators.required],
      }),
      products: new FormControl(promotionRawValue.products ?? []),
    });
  }

  getPromotion(form: PromotionFormGroup): IPromotion | NewPromotion {
    return this.convertPromotionRawValueToPromotion(form.getRawValue() as PromotionFormRawValue | NewPromotionFormRawValue);
  }

  resetForm(form: PromotionFormGroup, promotion: PromotionFormGroupInput): void {
    const promotionRawValue = this.convertPromotionToPromotionRawValue({ ...this.getFormDefaults(), ...promotion });
    form.reset(
      {
        ...promotionRawValue,
        id: { value: promotionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): PromotionFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      startAt: currentTime,
      endAt: currentTime,
      active: false,
      products: [],
    };
  }

  private convertPromotionRawValueToPromotion(rawPromotion: PromotionFormRawValue | NewPromotionFormRawValue): IPromotion | NewPromotion {
    return {
      ...rawPromotion,
      startAt: dayjs(rawPromotion.startAt, DATE_TIME_FORMAT),
      endAt: dayjs(rawPromotion.endAt, DATE_TIME_FORMAT),
    };
  }

  private convertPromotionToPromotionRawValue(
    promotion: IPromotion | (Partial<NewPromotion> & PromotionFormDefaults),
  ): PromotionFormRawValue | PartialWithRequiredKeyOf<NewPromotionFormRawValue> {
    return {
      ...promotion,
      startAt: promotion.startAt ? promotion.startAt.format(DATE_TIME_FORMAT) : undefined,
      endAt: promotion.endAt ? promotion.endAt.format(DATE_TIME_FORMAT) : undefined,
      products: promotion.products ?? [],
    };
  }
}
