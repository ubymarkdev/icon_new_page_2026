from django import forms
from phonenumber_field.formfields import SplitPhoneNumberField
from phonenumbers import national_significant_number, region_code_for_number
from .models import lead


class leadForm(forms.ModelForm):
    telefono = SplitPhoneNumberField(region="MX")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name in ["nombre", "requerimiento", "empresa"]:
            self.fields[field_name].widget.attrs.update({"class": "contact-input"})
        self.fields["canal"].widget.attrs.update({"class": "contact-select"})
        telefono_widget = self.fields["telefono"].widget
        if hasattr(telefono_widget, "widgets") and len(telefono_widget.widgets) == 2:
            telefono_widget.widgets[0].attrs.update({"class": "contact-select"})
            telefono_widget.widgets[1].attrs.update({
                "class": "contact-input",
                "inputmode": "numeric",
                "pattern": r"[0-9]*",
                "maxlength": "10",
                "autocomplete": "tel-national",
                "oninput": "this.value=this.value.replace(/\\D/g,'')",
            })

    def clean_telefono(self):
        telefono = self.cleaned_data.get("telefono")
        if not telefono:
            return telefono

        region = region_code_for_number(telefono)
        national_number = national_significant_number(telefono)
        if region == "MX" and len(national_number) != 10:
            raise forms.ValidationError("Para Mexico el telefono debe tener exactamente 10 digitos.")
        return telefono

    class Meta:
        model = lead
        fields = ["nombre", "telefono", "requerimiento", "empresa", "canal"]
